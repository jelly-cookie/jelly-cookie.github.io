import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Translate } from "@google-cloud/translate";

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
const translate = new Translate({ projectId: GOOGLE_CLOUD_PROJECT });

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
    const data = await response.json();

    if (!data.feed || data.feed.length === 0) {
      console.warn("⚠️ API response does not contain 'feed'. Keeping existing data.");
      process.exit(1);
    }

    // 뉴스 제목 번역
    for (let article of data.feed) {
      article.translatedTitle = await translateText(article.title, "ko");
    }

    // 데이터 저장
    fs.writeFileSync(NEWS_DATA_PATH, JSON.stringify(data, null, 2));
    console.log("✅ Successfully fetched, translated, and updated news data at", new Date().toISOString());

    // 변경 사항 확인
    const oldData = fs.readFileSync(BACKUP_PATH, "utf-8");
    const newData = fs.readFileSync(NEWS_DATA_PATH, "utf-8");

    if (oldData === newData) {
      // console.log("📝 No changes detected in news data.");
      // process.exit(2);
    } else {
      console.log("📝 Changes detected in news data.");
      process.exit(0); // GitHub Actions에서 변경 감지 여부 확인 가능
    }
  } catch (error) {
    console.error("❌ Error fetching news data:", error);
    process.exit(1);
  }
}

// 실행
fetchNewsData();
