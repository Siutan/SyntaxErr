<script setup>
import {validateUser} from "~/utils/authHelpers";

const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    console.log(email.value, password.value)
    const {error} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    signIn.close()
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const handleSignup = async () => {
  try {
    loading.value = true
    const getAvatar = localStorage.getItem('profile-image');
    let checkDetails = validateUser(email.value, username.value, getAvatar, password.value, confirmPassword.value);

    if (checkDetails.length === 0) {
      // if all details are valid, then sign up the user
      await signUpUser(email, password, username, getAvatar);
      console.log("signing up user")
      // close the modal
      signUp.close();
    } else {
      // if checkdetails returns an array with errors, then alert the user
      alert(checkDetails.join('\n'));
    }

  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const signUpUser = async (email, password, username, avatar) => {
  const {error} = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        avatar_url: avatar
      },
    },
  })
  if (error) {
    alert(error || error.message)
  }
}

const handleSignOut = async () => {
  try {
    loading.value = true
    const {error} = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<script>
import {fetchUnsplash} from "~/composables/fetchUnsplash";

console.log(process.env.UNSPLASH_API_KEY)
export default {
  data() {
    return {
      imageSource: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg'
    };
  },
  methods: {
    fetchRandomImage() {
      // Make API call to get random image from Unsplash
      const axios = fetchUnsplash();
      axios.get(`https://api.unsplash.com/photos/random`)
          .then(data => {
            this.imageSource = data.urls.small;
            // save image to local storage
            localStorage.setItem('profile-image', this.imageSource);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-2">
      <button class="btn btn-primary btn-wide" onclick="signIn.showModal()">Sign In</button>
      <button class="btn btn-primary btn-wide" onclick="signUp.showModal()">Sign Up</button>
      <button class="btn btn-primary btn-wide" @click="handleSignOut">Sign out</button>
    </div>
    <dialog id="signIn" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Sign In</h3>
        <div class="text-left">
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
            <input type="email" v-model="email" id="email" placeholder="email"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
            <input type="password" v-model="password" id="password" placeholder="password"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>
          <div class="mb-5">
            <button type="submit"
                    @click="handleLogin"
                    :value="loading ? 'Loading' : 'Login'"
                    :disabled="loading"
                    class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
              Login
            </button>
          </div>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <dialog id="signUp" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Sign In</h3>
        <div class="text-left">
          <div class="m-5 flex justify-center gap-5">
            <div>
              <label for="profile-img" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Profile Image</label>
              <button id="profile-img" class="btn btn-primary" @click.prevent="fetchRandomImage">Generate Random
              </button>
            </div>
            <div>
              <img type="image" id="profile-img-preview" :src="imageSource" alt="profile image"
                   class="w-24 h-24 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2">
            </div>
          </div>

          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
            <input type="email" v-model="email" id="signup-email" placeholder="email"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>

          <div class="mb-5">
            <label for="username" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Username</label>
            <input type="text" v-model="username" id="username" placeholder="username"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>

          <div class="mb-5">
            <label for="confirm-password" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
            <input type="password" v-model="password" id="signup-password" placeholder="password"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>

          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirm Password</label>
            <input type="password" v-model="confirmPassword" id="confirm-password" placeholder="confirm password"
                   class="input input-bordered input-primary w-full focus:outline-none">
          </div>

          <div class="mb-5">
            <button type="submit"
                    @click="handleSignup"
                    :value="loading ? 'Loading' : 'Login'"
                    :disabled="loading"
                    class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<style>
[data-theme="forest"] .input {
  border-radius: 0.5rem;
}
</style>