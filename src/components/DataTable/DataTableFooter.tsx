import { MouseEvent } from 'react';

interface DataTableFooterProps {
    handlePageClick: (e: MouseEvent<HTMLAnchorElement>, page: number) => void;
    pageInfo: {
        amount: number;
        current: number;
        start: number;
        end: number;
        total: number
    };
}

export default function DataTableFooter({ handlePageClick, pageInfo }: DataTableFooterProps) {

    const pages = [];
    for (let index = 1; index <= pageInfo.amount; index++) {
        pages.push(
            <li key={index}>
                <a href="#" onClick={(e) => handlePageClick(e, index)} className={pageInfo.current === index ? 'on' : ''}>{index}</a>
            </li>
        );
    }

    return (
        <div className="footer">
            <div className="info">
                {pageInfo.total > 0 && `Showing users from ${pageInfo.start} to ${pageInfo.end} of ${pageInfo.total}`}
            </div>
            <div className="pages">
                {pageInfo.amount > 1 && (
                    <>
                        <a href="#"
                            onClick={(e) => handlePageClick(e, pageInfo.current === 1 ? 1 : pageInfo.current - 1)}
                            className={pageInfo.current === 1 ? 'disabled' : ''}
                        >Prev</a>
                        <ul>
                            {pages}
                        </ul>
                        <a href="#"
                            onClick={(e) => handlePageClick(e, pageInfo.current === pageInfo.amount ? pageInfo.amount : pageInfo.current + 1)}
                            className={pageInfo.current === pageInfo.amount ? 'disabled' : ''}
                        >Next</a>
                    </>
                )}
            </div>
        </div>
    );
}
