import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter
const url = 'http://localhost:4040'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photos: []
  },
  mutations: {
    SET_PHOTO(state, data){
      state.photos = data
    }
  },
  actions: {
    login(context, obj){
      axios({
        url: `${url}/login`,
        method: 'post',
        data: obj
      })
      .then(({data}) => {
        console.log(data)
        if(data.role === 'admin'){
          router.push('/')
          .catch((e) => {
            if (!isNavigationFailure(e, NavigationFailureType.redirected)) {
                Promise.reject(e)
            }
          })
          localStorage.setItem('token', data.token)
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
    
          Toast.fire({
            icon: "success",
            title: "Login success as admin",
          });
        }
        else{
          router.push('/home-member')
          .catch((e) => {
            if (!isNavigationFailure(e, NavigationFailureType.redirected)) {
                Promise.reject(e)
            }
          })
          localStorage.setItem('memberToken', data.token)
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
    
          Toast.fire({
            icon: "success",
            title: "Login success as member",
          });
        }
      })
      .catch(err => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        console.log(err)
        Toast.fire({
          icon: "error",
          title: 'Login Failed'
        });
      })
    },
    register(context, obj){
      axios({
        url: `${url}/register`,
        method: 'post',
        data: obj
      })
      .then(({data}) => {
        console.log(data)
        router.push('/login')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addPhoto(context, obj){
      axios({
        url: `${url}/photo`,
        method: 'post',
        data: obj,
        headers: {
          token: localStorage.token
        }
      })
      .then((photo) => {
        console.log(photo)
        context.dispatch('fetchPhotos')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    fetchPhotos(context){
      axios({
        url: `${url}/photo`,
        method: 'get',
        headers: {
          token: localStorage.token || localStorage.memberToken
        }
      })
      .then(({data}) => {
        console.log(data)
        context.commit('SET_PHOTO', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    destroy(context, id){
      axios({
        url: `${url}/photo/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token
        }
      })
      .then(photo => {
        console.log(photo)
        context.dispatch('fetchPhotos')
      })
      .catch(err => {
        console.log(err)
      })
    },
    getPhotoById(context, id){
      return axios({
        url: `${url}/photo/${id}`,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
    },
    editPhoto(context, obj){
      axios({
        url: `${url}/photo/${obj.id}`,
        method: 'put',
        headers: {
          token: localStorage.token
        },
        data: obj
      })
      .then(photo => {
        console.log(photo)
        context.dispatch('fetchPhotos')
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
