export const ISSUES_DATA = {
    urls: [
      {
        url: 'https://api.github.com/search/issues?q=repo%3Amicrosoft%2FCBL-Mariner&page=2',
        title: 'next',
        page: '2',
        showPage: false
      },
      {
        showPage: true
      },
      {
        url: ' https://api.github.com/search/issues?q=repo%3Amicrosoft%2FCBL-Mariner&page=27',
        title: 'last',
        page: '27',
        showPage: false
      }
    ], 
    issues: {
      '1': {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 842912478,
            title: 'Automatic update of the `kubernetes` packages.',
          },
          {
            id: 842668222,
            number: 805,
            title: 'diskutils: add more robust handling of disk/partition operations',
          },
          {
            id: 842369440, 
            title: 'Change dropdown menus to accessible input fields',
          },
        ]
      }
    },
    loading: false,
    hasErrors: false,
    loadMore: () => {},
    currentPage: 1,
    totalCount: 1
  }