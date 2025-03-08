import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname을 사용 가능하게 설정 (ESM에서는 기본적으로 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEWS_DATA_PATH = path.join(__dirname, "public/news-data.json");
const BACKUP_PATH = path.join(__dirname, "public/news-data.json.bak");
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || "";

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
  console.error("❌ API key is missing! Keeping existing data.");
  process.exit(1);
}

// API 요청을 통해 뉴스 데이터 가져오기
async function fetchNewsData() {
  try {
    const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_fiscal&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.feed) {
      console.warn("⚠️ API response does not contain 'feed'. Keeping existing data.");
      process.exit(1);
    }

    // 데이터 저장
    fs.writeFileSync(NEWS_DATA_PATH, JSON.stringify(data, null, 2));
    console.log("✅ Successfully fetched and updated news data at", new Date().toISOString());

    // 변경 사항 확인
    const oldData = fs.readFileSync(BACKUP_PATH, "utf-8");
    const newData = fs.readFileSync(NEWS_DATA_PATH, "utf-8");

    if (oldData === newData) {
      console.log("📝 No changes detected in news data.");
      process.exit(0);
    } else {
      console.log("📝 Changes detected in news data.");
      process.exit(2); // GitHub Actions에서 변경 감지 여부 확인 가능
    }
  } catch (error) {
    console.error("❌ Error fetching news data:", error);
    process.exit(1);
  }
}

// 실행
fetchNewsData();
