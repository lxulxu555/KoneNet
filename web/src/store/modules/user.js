import {login,Register,info,updateInfo} from '../../api/user';
import {getToken, setToken, removeToken} from '../../utils/auth';
import {Message} from "ant-design-vue";
import {Spin} from "ant-design-vue";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    mobile:'',
    avatar: '',
    spinning: false,
    users:''
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, users) => {
    state.users = users;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile;
  },
  SET_EMAIL: (state, email) => {
    state.email = email;
  }
};

const actions = {
  // user login
  login({commit}, userInfo) {
    const {name, password} = userInfo;
    return new Promise((resolve, reject) => {
      login({username: name.trim(), password: password}).then(response => {
        if (response.code == '0'){
          console.log(response)
          commit('SET_TOKEN', response.data.token);
          commit('SET_USER', JSON.stringify(response.data.user));
          window.sessionStorage.setItem('token',response.data.token)
          window.sessionStorage.setItem('userinfo',JSON.stringify(response.data.user))
          setToken(response.data.token);
          resolve();
        }else {
          // console.log(response.msg)
          // this.spinning = false
          Message.error(response.msg)
          // console.log(this.$store.state.spinning)
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user Register
  Register({commit}, userInfo) {
    const {name, password} = userInfo;
    return new Promise((resolve, reject) => {
      Register({username: name.trim(), password: password}).then(response => {
        if (response.code == '0'){
          resolve();
        }else {
          console.log(response.msg)
          this.spinning = false
          Message.error(response.msg)
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user info
  info({commit}, userInfo) {
    const {name, password} = userInfo;
    return new Promise((resolve, reject) =>{
      info({username: name.trim(), password: password}).then(response => {
        if (response.code == '0'){
          // commit('SET_USER', JSON.stringify(response.data.user));
          // window.sessionStorage.setItem('token',response.data.token)
          window.sessionStorage.setItem('getuserInfo',JSON.stringify(response.data.user))
          // console.log(window.sessionStorage.setItem('userinfo',JSON.stringify()),99999)
          resolve();
        }else {
          Message.error(response.msg)
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user update
  updateInfo({commit}, userInfo) {
    const {school,introduce,major,business,register,gender,years,diploma} = userInfo;
    const userInfoForm = JSON.parse(window.sessionStorage.getItem('getuserInfo'))
    return new Promise((resolve, reject) =>{
      updateInfo({educations:[{school:school !== ''? school : userInfoForm.educations[0].school,
          diploma:diploma && diploma.length !== 0 ? diploma : userInfoForm.educations[0].diploma,
          major:major !== ''? major : userInfoForm.educations[0].major,
          entrance_year:parseInt(years[0]) !== undefined ? parseInt(years[0]) : userInfoForm.educations[0].entrance_year,
          graduation_year:parseInt(years[1]) !== undefined ? parseInt(years[1]) :userInfoForm.educations[0].graduation_year}],
          gender:gender,
          locations:[register !== '' ? register : userInfoForm.locations[0]],
          business:business !== '' ? business : userInfoForm.business,
          headline:introduce !== '' ? introduce : userInfoForm.headline}).then(response => {
        console.log(userInfoForm.locations,'locations')
        if (response.code == '0'){
          window.sessionStorage.setItem('updateuserinfo',JSON.stringify(response.data))
          resolve();
        }else {
          Message.error(response.msg)
        }
      }).catch(error => {
        reject(error);
      });
    });
  },

 // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {

        if (!response.userinfo) {
          reject('验证失败，请重新登陆');
        }

        // console.log(response)

        const {username,avatar,mobile,email} = response.userinfo;

        commit('SET_NAME', username);
        commit('SET_AVATAR', avatar);
        commit('SET_MOBILE', mobile);
        commit('SET_EMAIL', email);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
        removeToken(); // must remove  token  first
        // resetRouter();
      console.log(11111111111)
        commit('RESET_STATE');
        resolve();
      })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

