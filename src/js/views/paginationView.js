import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateNextButtonMarkup(curPage) {
    return `
    <button class="btn--inline pagination__btn--next" data-goto="${
      curPage + 1
    }">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;
  }

  _generatePreviousButtonMarkup(curPage) {
    return `
        <button class="btn--inline pagination__btn--prev" data-goto="${
          curPage - 1
        }">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    // page 1, having more than one page
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButtonMarkup(curPage);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePreviousButtonMarkup(curPage);
    }

    //other page
    if (curPage < numPages) {
      return `${this._generatePreviousButtonMarkup(
        curPage
      )} ${this._generateNextButtonMarkup(curPage)}`;
    }

    // page 1, having no other page
    return '';
  }
}

export default new PaginationView();
