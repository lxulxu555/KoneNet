const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  mobile: state => state.user.mobile,
  email: state => state.user.email,
  users: state => state.user.users,
}
export default getters
