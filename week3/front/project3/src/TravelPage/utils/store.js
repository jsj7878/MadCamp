const cards = [
    {
      id: 'card-1',
      title: 'Learning how to cook',
      sub: 'subtitle',
    },
    {
      id: 'card-2',
      title: 'Making sandwich',
      sub: 'subtitle',
    },
    {
      id: 'card-3',
      title: 'Taking the trash out',
      sub: 'subtitle',
    },
  ];
  
  const data = {
    lists: {
      'list-1': {
        id: 'list-1',
        title: '나의 여행지',
        cards : [] ,
      },
      'list-2': {
        id: 'list-2',
        title: '여행지 목록',
        cards : []
      },
    },
    listIds: ['list-1', 'list-2'],
  };
  
  export default data;