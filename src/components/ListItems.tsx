import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

interface ListProps {
	urls: any[], 
	issues: any,
	loading: boolean,
	hasErrors: boolean,
	loadMore: Function,
	currentPage: number,
	totalCount: number
}
const renderItem = ({item}) => {
	return (
		<View key={item.id} style={styles.itemContainer}>
			<Text style={styles.text}>{item.title}</Text>
		</View>
	)
}

const keyExtractor = (item: any) => item.id;

const renderSeparator = () => {
	return <View style={styles.separatorStyle} />
}
const renderPaggination = (urls: any[], loadMore: Function, currentPage: number, totalCount: number) => {
	const totalPages = Math.ceil(totalCount / 30);
	const result  = urls.map((item:any, index: number) => {
		if (item.showPage) {
			return (
				<Text key={index} style={styles.pageText}>{`Page ${currentPage} of ${totalPages}`}</Text>
			)
		}
		return (
			<>
				<TouchableOpacity
					key={index}
					style={styles.navBar}
					onPress={() => loadMore(item.url, item.page)}
				>
					<Text style={styles.navText}>{item.title}</Text>
				</TouchableOpacity>
			</>
		)
	})
	return result;
}

function ListItems (props: ListProps) {
	const { loading, hasErrors, issues, urls, currentPage, loadMore, totalCount } = props;
	const { items } = issues && issues[currentPage] || {};
	// console.log('data-loading: ', loading);
  return (
		<View style={styles.container}>
			<Text style={styles.titleText}>List of Issues</Text>
			{urls && urls.length>0 && <View style={styles.navBarContainer}>
				{renderPaggination(urls, loadMore, currentPage, totalCount)}
			</View>}
			<FlatList
          contentContainerStyle={styles.ListContainer}
          data={items} 
          renderItem={renderItem}
          keyExtractor={keyExtractor}
					ItemSeparatorComponent={renderSeparator}
        />
		</View>
	)
}

export default React.memo(ListItems);
const styles = StyleSheet.create({
	container: {
		width: '100%',
		flex: 1,
		padding: 10,
	},
	ListContainer: {
		marginTop: 10,
		paddingBottom: 10
	},
	separatorStyle: {
		height: 5
	},
	itemContainer: {
		padding: 10,
		backgroundColor: '#5DADE2',
		minHeight: 60,
		justifyContent: 'center'
	},
	text: {
		color: "#09182b",
		fontSize: 15,
		fontWeight: "800",
	},
	navBarContainer: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	navBarInnerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	navBar: {
		padding: 10,
		backgroundColor: '#C0392B',
	},
	navText: {
		color: '#FDEDEC',
		fontSize: 15,
		fontWeight: "800",
		textAlign: 'center'
	},
	titleText: {
		color: '#273746',
		fontSize: 20,
		fontWeight: "800",
		textAlign: 'center'
	},
	pageText: {
		color: '#273746',
		fontSize: 15,
		fontWeight: "800",
		textAlign: 'center'
	}
})