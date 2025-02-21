export const petlinkFormComponents = {
	formId: 'petlink',
	title: 'Petlink',
	components: [
		{
			name: 'Select',
			key: 'type',
			focused: true,
			hidden: false,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose clinic or store'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: ['Clinic', 'Store']
				}
			]
		},
		{
			name: 'Select',
			key: 'clinic',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose clinic'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'store',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose store'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'place',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose place'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'drug',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose drug'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'food',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose food'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		},
		{
			name: 'Select',
			key: 'item',
			hidden: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose item'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Items',
					value: []
				}
			]
		}
	]
};
