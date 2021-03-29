import React, {useEffect} from 'react'
import {  
	View, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput, 
	Text,
	ActivityIndicator
 } from 'react-native'
// import the useDispatch Redux hook
import { useDispatch, useSelector } from 'react-redux'		
import { fetchIssues, issuesSelector, reset } from '../../redux/issuesSlice'
import ListItems from '../../components/ListItems';
import { objectEmptyCheck } from '../../utils';
import BaseInput from '../../components/BaseInput';

const Home = (): React.ReactElement => {
	const [author, onChangeAuthor] = React.useState("");
	const [orgs, onChangeOrgs] = React.useState("");
	const [repo, onChangeRepo] = React.useState("");
	const dispatch = useDispatch()		
  const { urls, currentPage, issues, loading, hasErrors, errorMessage, totalCount } = useSelector(issuesSelector);
	useEffect(() => {
		dispatch(reset());
	}, [])

	const onSearchHandler = () => {
		dispatch(fetchIssues(orgs, repo, author, 1));
	}
	const onLoadMore = (_url: string, _page: number) => {
		dispatch(fetchIssues(orgs, repo, author, _page));
	}
	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Github</Text>
			{hasErrors && <Text style={styles.errorText}>{errorMessage}</Text>}
			<BaseInput label="Enter Organization name">
				<TextInput
					accessibilityLabel="input values"
					style={styles.input}
					onChangeText={onChangeOrgs}
					value={orgs}
					autoCapitalize="none"
				/>
			</BaseInput>
			<BaseInput label="Enter Repo name">
				<TextInput
					accessibilityLabel="input values"
					style={styles.input}
					onChangeText={onChangeRepo}
					value={repo}
					autoCapitalize="none"
				/>
			</BaseInput>
			<BaseInput label="Enter Author name">
				<TextInput
					accessibilityLabel="input values"
					style={styles.input}
					onChangeText={onChangeAuthor}
					value={author}
					autoCapitalize="none"
				/>
			</BaseInput>
			
			<TouchableOpacity
				style={styles.button}
				onPress={onSearchHandler}
			>
				<Text style={styles.text}>Search</Text>
			</TouchableOpacity>

			{!objectEmptyCheck(issues) && <ListItems 
				urls={urls} 
				issues={issues} 
				loading={loading} 
				hasErrors={hasErrors}
				currentPage={currentPage}
				loadMore={onLoadMore}
				totalCount={totalCount}
			/>}
			{loading && <View style={styles.loading}>
					<ActivityIndicator size="large" color="#7DCEA0" />
			</View>}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10,
	},
	titleText: {
		color: '#273746',
		fontSize: 20,
		fontWeight: "800",
		textAlign: 'center',
		marginBottom: 10,
	},
	loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  input: {
		marginTop:5,
		padding: 10,
    height: 50,
    borderWidth: 1,
		borderRadius: 10,
		fontSize: 18,
  },
	text: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
  },
	button: {
		marginTop: 10,
		minWidth: '30%',
		padding: 10,
		backgroundColor: '#68a0cf',
		borderRadius: 10,
	},
	tile: {
		width: '50%',
		height: '50%',
		marginTop: 20,
		borderColor: '#ff0000',
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	errorText: {
		padding: 10,
		fontSize: 20,
		color: '#ff0000',
		textAlign: 'center'
	}
});
export default Home