import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dayjs from 'dayjs';

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 경로 설정
const NEWS_DATA_PATH = path.join(__dirname, "public/news-data.json");
const STATIC_HTML_PATH = path.join(__dirname, "public/static-news.html");
const BUILD_STATIC_HTML_PATH = path.join(__dirname, "build/static-news.html");

// 뉴스 데이터 읽기
async function generateStaticHTML() {
  try {
    // 뉴스 데이터 파일이 존재하는지 확인
    if (!fs.existsSync(NEWS_DATA_PATH)) {
      console.error("❌ News data file not found!");
      process.exit(1);
    }

    // 뉴스 데이터 읽기
    const newsDataRaw = fs.readFileSync(NEWS_DATA_PATH, "utf-8");
    const newsData = JSON.parse(newsDataRaw);

    if (!newsData.feed || newsData.feed.length === 0) {
      console.warn("⚠️ No news data found in the file.");
      process.exit(1);
    }

    // 시간 포맷팅 함수
    const formatTime = (timeStr) => {
      return dayjs(timeStr, 'YYYYMMDDTHHmmss').format('HH:mm MMM DD');
    };

    // 감정 색상 함수
    const getSentimentColor = (sentiment) => {
      switch (sentiment) {
        case 'Bullish':
          return '#4caf50';
        case 'Somewhat-Bullish':
          return '#81c784';
        case 'Bearish':
          return '#f44336';
        case 'Somewhat-Bearish':
          return '#e57373';
        default:
          return '#9e9e9e';
      }
    };

    // HTML 생성
    let html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="실시간 금융 뉴스 피드 - 경제, 주식, 시장 동향을 한눈에 확인하세요. 젤리 파이낸셜에서 제공하는 최신 금융 뉴스와 분석" />
  <meta name="keywords" content="금융뉴스,경제뉴스,주식뉴스,시장동향,금융정보,젤리파이낸셜" />
  <meta name="author" content="Jelly Financial" />
  <meta property="og:title" content="젤리 파이낸셜 - 실시간 금융 뉴스" />
  <meta property="og:description" content="실시간 금융 뉴스 피드 - 경제, 주식, 시장 동향을 한눈에 확인하세요" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://jelly-cookie.github.io/" />
  <meta name="google-site-verification" content="z3nxuhTqr3WW8Z_5QPyNNXBG5hSp-o--YlZu7EI89qY" />
  <title>젤리 파이낸셜 - 실시간 금융 뉴스</title>
  <link rel="canonical" href="https://jelly-cookie.github.io/" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(to bottom, #121212, #1a1a1a);
      color: #ffffff;
      min-height: 100vh;
    }
    header {
      background-color: #1E1E1E;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    .news-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    .news-item {
      background-color: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      padding: 1rem;
      transition: transform 0.2s;
      cursor: pointer;
    }
    .news-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
      transform: translateY(-2px);
    }
    .news-header {
      display: flex;
      margin-bottom: 1rem;
    }
    .news-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      margin-right: 1rem;
      background-color: rgba(144, 202, 249, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .news-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
    .news-content {
      flex-grow: 1;
    }
    .news-title {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    .news-meta {
      display: flex;
      gap: 0.5rem;
      color: #9e9e9e;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    .news-sentiment {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .news-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .topic {
      background-color: rgba(144, 202, 249, 0.08);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
    }
    .js-notice {
      background-color: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      text-align: center;
    }
    @media (max-width: 600px) {
      .news-title {
        font-size: 1rem;
      }
      .container {
        padding: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>젤리 파이낸셜 - 실시간 금융 뉴스</h1>
  </header>
  <div class="container">
    <div class="js-notice">
      <p>자바스크립트가 비활성화되어 있습니다. 더 나은 경험을 위해 자바스크립트를 활성화해주세요.</p>
    </div>
    <div style="display: flex; gap: 2rem; position: relative;">
      <div class="news-list" style="flex: 1;">
`;

    // 뉴스 아이템 추가
    newsData.feed.forEach(item => {
      const sentimentColor = getSentimentColor(item.overall_sentiment_label);
      
      html += `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news-item">
        <div class="news-header">
          <div class="news-icon">
            ${item.banner_image ? `<img src="${item.banner_image}" alt="${item.source}" onerror="this.style.display='none'">` : '📰'}
          </div>
          <div class="news-content">
            <div class="news-title">${item.translatedTitle || item.title}</div>
            <div class="news-meta">
              <span>${formatTime(item.time_published)}</span>
              <span>•</span>
              <span>${item.source}</span>
            </div>
          </div>
        </div>
        <div>
          <span class="news-sentiment" style="background-color: ${sentimentColor}15; color: ${sentimentColor}; border: 1px solid ${sentimentColor}">
            ${item.overall_sentiment_label}
          </span>
          <div class="news-topics">
            ${item.topics ? item.topics.map(topic => 
              `<span class="topic">${typeof topic === 'string' ? topic : topic.topic}</span>`
            ).join('') : ''}
          </div>
        </div>
      </a>
      `;
    });

    // HTML 닫기
    html += `
      </div>
      <div style="width: 160px; height: 600px; position: sticky; top: 1rem;">
        <ins 
          class="kakao_ad_area" 
          style="display: none;"
          data-ad-unit="${process.env.REACT_APP_KAKAO_ADFIT_PC_ID}"
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // 파일 저장
    fs.writeFileSync(STATIC_HTML_PATH, html);
    console.log("✅ Successfully generated static HTML at", STATIC_HTML_PATH);

    // build 디렉토리가 존재하는지 확인하고 정적 HTML 파일 복사
    if (fs.existsSync(path.join(__dirname, "build"))) {
      fs.copyFileSync(STATIC_HTML_PATH, BUILD_STATIC_HTML_PATH);
      console.log("✅ Successfully copied static HTML to build directory");
    }

    process.exit(0);

  } catch (error) {
    console.error("❌ Error generating static HTML:", error);
    process.exit(1);
  }
}

// 실행
generateStaticHTML(); 