export const petrecordFormComponents = {
	formId: 'petrecord',
	title: 'Record',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petrecord title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petrecord description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
