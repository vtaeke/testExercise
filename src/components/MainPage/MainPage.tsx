import React, { useState, useEffect } from 'react';
import { Dropdown, Pagination } from 'react-bootstrap';
import type { ReviewsData, LanguageReviews, Review } from './types';
import ReviewComponent from './ReviewComponent';

const MainPage: React.FC = () => {
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageOnLanguageChange, setCurrentPageOnLanguageChange] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(currentPageOnLanguageChange);
  }, [currentPageOnLanguageChange]);

  const fetchData = async () => {
    try {
      const response = await fetch('/data/data.json');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setReviewsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as 'ru' | 'en');
    setCurrentPageOnLanguageChange(currentPage);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!reviewsData) {
    return <div>Loading...</div>;
  }

  const languageReviews: LanguageReviews = reviewsData[language];
  const reviewsPerPage = 10;
  const totalReviews: number = Object.keys(languageReviews).length;
  const totalPages: number = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex: number = (currentPage - 1) * reviewsPerPage;
  const endIndex: number = startIndex + reviewsPerPage;

  const reviewsToRender: Review[] = Object.keys(languageReviews)
    .slice(startIndex, endIndex)
    .map((clientKey) => languageReviews[clientKey]);

  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle htmlFor="language-select">Выберите язык</Dropdown.Toggle>
        <Dropdown.Menu id="language-select" onChange={handleLanguageChange}>
          <Dropdown.Item onClick={() => setLanguage('ru')}>Русский</Dropdown.Item>
          <Dropdown.Item onClick={() => setLanguage('en')}>English</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1>Отзывы клиентов:</h1>
      {reviewsToRender.map((review, index) => (
        <ReviewComponent key={`${review.id}-${index}`} review={review} />
      ))}
      <Pagination style={{ marginTop: '15px' }}>
        {pageNumbers.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default MainPage;
