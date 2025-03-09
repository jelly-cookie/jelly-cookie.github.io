import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import translateAPI from '@google-cloud/translate';
const { Translate } = translateAPI.v2;

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 경로 설정
const NEWS_DATA_PATH = path.join(__dirname, "public/news-data.json");
const BACKUP_PATH = path.join(__dirname, "public/news-data.json.bak");

// API 키 설정
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || "";
const GOOGLE_CLOUD_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || "";

// Google Cloud Translation 클라이언트 생성
const translate = new Translate({
  projectId: GOOGLE_CLOUD_PROJECT,
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
});

// 폴더 생성
if (!fs.existsSync("public")) {
  fs.mkdirSync("public", { recursive: true });
}

// 기존 데이터 백업
if (fs.existsSync(NEWS_DATA_PATH)) {
  fs.copyFileSync(NEWS_DATA_PATH, BACKUP_PATH);
} else {
  fs.writeFileSync(BACKUP_PATH, JSON.stringify({ feed: [] }, null, 2));
}

// API 키 확인
if (!API_KEY) {
  console.error("❌ Alpha Vantage API key is missing! Keeping existing data.");
  process.exit(1);
}
if (!GOOGLE_CLOUD_PROJECT) {
  console.error("❌ Google Cloud Project ID is missing! Cannot translate.");
  process.exit(1);
}

// Google 번역 함수
async function translateText(text, targetLang = "ko") {
  try {
    let [translations] = await translate.translate(text, targetLang);
    return translations;
  } catch (error) {
    console.error("❌ Error translating text:", error);
    return text; // 번역 실패 시 원문 유지
  }
}

// API 요청을 통해 뉴스 데이터 가져오기
async function fetchNewsData() {
  try {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_fiscal&apikey=${API_KEY}`;
    const response = await fetch(url);
    const newData = await response.json();

    if (!newData.feed || newData.feed.length === 0) {
      console.warn("⚠️ API response does not contain 'feed'. Keeping existing data.");
      process.exit(1);
    }

    // news-data 브랜치의 데이터를 가져오기 위한 임시 저장소 생성
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // news-data 브랜치의 최신 데이터 가져오기
    try {
      const { execSync } = await import('child_process');
      console.log("Fetching data from news-data branch...");
      
      try {
        // Git 설정에 토큰 추가
        if (process.env.GITHUB_TOKEN) {
          const repoUrl = process.env.GITHUB_REPOSITORY;
          execSync(
            `git remote set-url origin https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${repoUrl}.git`
          );
        }

        // Git 명령어 실행 및 상세 에러 출력
        execSync(`git fetch origin news-data`, { 
          stdio: 'inherit',  // 실시간으로 출력 표시
          encoding: 'utf-8'
        });
        
        execSync(`git show origin/news-data:public/news-data.json > ${path.join(tempDir, "news-data.json")}`, {
          stdio: 'inherit',
          encoding: 'utf-8'
        });
      } catch (gitError) {
        console.error("Git command failed with error:", gitError);
        console.error("Error details:", gitError.stderr);
        console.error("Error code:", gitError.status);
        throw gitError;
      }

      const oldDataRaw = fs.readFileSync(path.join(tempDir, "news-data.json"), "utf-8");
      const oldData = JSON.parse(oldDataRaw);

      // title만 비교하기 위해 필요한 정보만 추출하여 비교
      const oldTitles = oldData.feed.map(item => item.title);
      const newTitles = newData.feed.map(item => item.title);

      // 디버깅을 위한 로그 추가
      console.log("Old titles:", JSON.stringify(oldTitles, null, 2));
      console.log("New titles:", JSON.stringify(newTitles, null, 2));
      console.log("Are titles equal?", JSON.stringify(oldTitles) === JSON.stringify(newTitles));

      if (JSON.stringify(oldTitles) === JSON.stringify(newTitles)) {
        console.log("📝 No changes detected in news titles.");
        process.exit(2);
      }
    } catch (error) {
      console.log("⚠️ No previous data found in news-data branch, proceeding with translation...");
      console.log(error)
    }

    // 변경사항이 있는 경우에만 번역 진행
    console.log("📝 Changes detected in news data. Starting translation...");
    for (let article of newData.feed) {
      article.translatedTitle = await translateText(article.title, "ko");
    }

    // 번역된 데이터 저장
    fs.writeFileSync(NEWS_DATA_PATH, JSON.stringify(newData, null, 2));
    console.log("✅ Successfully fetched, translated, and updated news data at", new Date().toISOString());
    process.exit(0);

  } catch (error) {
    console.error("❌ Error fetching news data:", error);
    process.exit(1);
  }
}

// 실행
fetchNewsData();
