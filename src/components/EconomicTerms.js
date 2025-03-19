import React, { useState } from 'react';
import economicTermsData from '../data/economic-terms.json';

const EconomicTerms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedTerm, setSelectedTerm] = useState(null);

  // 카테고리 목록 추출
  const categories = ['전체', ...new Set(economicTermsData.map(term => term.카테고리))];

  // 검색어와 카테고리에 따라 용어 필터링
  const filteredTerms = economicTermsData.filter(term => {
    const matchesSearch = term.경제용어.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.요약설명.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || term.카테고리 === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="economic-terms-container">
      <h2>경제 용어 사전</h2>
      
      {/* 검색 및 카테고리 필터 */}
      <div className="filters">
        <input
          type="text"
          placeholder="경제 용어 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 용어 목록 및 상세 정보 */}
      <div className="terms-content">
        <div className="terms-list">
          {filteredTerms.map(term => (
            <div
              key={term.경제용어}
              className={`term-item ${selectedTerm?.경제용어 === term.경제용어 ? 'selected' : ''}`}
              onClick={() => setSelectedTerm(term)}
            >
              <h3>{term.경제용어}</h3>
              <p className="category">{term.카테고리}</p>
              <p className="summary">{term.요약설명}</p>
            </div>
          ))}
        </div>

        {/* 선택된 용어 상세 정보 */}
        {selectedTerm && (
          <div className="term-detail">
            <h3>{selectedTerm.경제용어}</h3>
            <div className="detail-content">
              <p>
                <strong>정의</strong>
                {selectedTerm.정의}
              </p>
              <p>
                <strong>예시</strong>
                {selectedTerm.예시}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EconomicTerms; 