import { createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'https://api.github.com/';
interface ListProps {
	urls: any[], 
	issues: any,
	loading: boolean,
	hasErrors: boolean
  currentPage: number,
  errorMessage:string,
  totalCount: number,
}

export const initialState: ListProps = {
  loading: false,
  hasErrors: false,
  issues: {},
  urls: [],
  currentPage: 0,
  errorMessage: '',
  totalCount: 0,
}

// A slice for issues
const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    getIssues: state => {
      state.loading = true
    },
    getIssuesSuccess: (state, { payload }) => {
      const { urls, data, currentPage, totalCount} = payload;
			state.urls = urls;
      state.issues[currentPage] = data;
      state.currentPage = currentPage;
			state.loading = false;
			state.hasErrors = false;
      state.totalCount = totalCount;
    },
    getIssuesFailure: (state, {payload}) => {
			state.loading = false;
			state.hasErrors = true;
      state.errorMessage = payload;
      state.issues = {};
      state.urls = [];
    },
    reset: () => initialState
  },
})

// Actions generated from the slice
export const { 
	getIssues,
	getIssuesSuccess,
	getIssuesFailure,
  reset
} = issuesSlice.actions

// selectors
export const issuesSelector = (state: any) => state.issues;

// The reducer
export default issuesSlice.reducer

// Asynchronous thunk action
export function fetchIssues(orgs: string, repo:string, author: string, page: number) {
  return async (dispatch: any) => {
    dispatch(getIssues())
    let url: string;
    if (author !== "") {
      url = `${BASE_URL}search/issues?q=author:${author} repo:${orgs}/${repo}&page=${page}`
    } else {
      url = `${BASE_URL}search/issues?q=repo:${orgs}/${repo}&page=${page}`
    }
    try {
      const response = await fetch(url)
      const link = response.headers.get("link");
      let urls: any;
      if (link) {
        const links = link.split(',');
        urls = links.map((item: any) => {
          const url = item.split(';')[0].replace(">","").replace("<","");
          const title = item.split(';')[1].split('rel="')[1].replace('"',"");
          const page = url.split('page=')[1];
          const showPage = false;
          return {url, title, page, showPage }
        })
      } else {
        urls = []
      }
      
      const data = await response.json();
      // console.log('data-data: ', data);
      if (data.errors && Array.isArray(data.errors)) {
        dispatch(getIssuesFailure(data.errors[0].message))
      } else {
        if (link) {
          const pageInsertPosition = urls.length / 2;
          urls.splice(pageInsertPosition, 0, {showPage: true});
        }
        dispatch(getIssuesSuccess({
          data,
          urls,
          currentPage: page,
          totalCount: data.total_count
        }))
      }
    } catch (error) {
      console.log('data-error:', error);
      dispatch(getIssuesFailure('Something went wrong , please try again!'))
    }
  }
}