export const petdoctorFormComponents = {
	formId: 'petdoctor',
	title: 'Petdoctor',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill petdoctor title',
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
					value: 'fill petdoctor description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
