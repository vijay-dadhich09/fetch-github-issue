export function objectEmptyCheck(value: any) {
	return Object.keys(value).length === 0
		&& value.constructor === Object; // 👈 constructor check
}