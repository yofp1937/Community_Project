import React from 'react';
import styles from './Pagination.module.css';

// 페이징 참고 글 - https://www.daleseo.com/react-pagination/
function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    // 한번에 5개의 페이지를 표시하게 설정
    const groupNumber = Math.ceil(page / 5);

    // 첫번째 페이지번호와 마지막 페이지 번호 계산
    const firstPage = (groupNumber - 1) * 5 + 1;
    const lastPage = Math.min(groupNumber * 5, numPages);
  
    return (
      <div className={styles.Pagination}>
        {/* 첫번째 페이지로 이동하는 << 버튼 */}
        <button onClick={() => setPage(1)} disabled={page === 1}>{"<<"}</button>

        {/* 이전 페이지 목록으로 이동하는 < 버튼 */}
        <button onClick={() => setPage(firstPage - 1)} disabled={groupNumber === 1}>{"<"}</button>

        {/* 페이지 번호 표시 */}
        {Array.from({ length: lastPage - firstPage + 1 }, (_, i) => (
            <button key={firstPage + i} onClick={() => setPage(firstPage + i)} aria-current={page === firstPage + i ? "page" : undefined}
            >
            {firstPage + i}
            </button>
        ))}

      {/* 다음 페이지 목록으로 이동하는 > 버튼 */}
      <button onClick={() => setPage(lastPage + 1)} disabled={groupNumber === Math.ceil(numPages / 5)}>{">"}</button>

      {/* 마지막 페이지로 이동하는 >> 버튼 */}
      <button onClick={() => setPage(numPages)} disabled={page === numPages}>{">>"}</button>
      </div>
    );
  }

  export default Pagination;