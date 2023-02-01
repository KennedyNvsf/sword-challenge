export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName', 
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'userRole', 
      title: 'User Role',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image URL',
      type: 'string', 
    }
  ]
}
