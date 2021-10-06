<template>
<form class="box" @submit.prevent="onSubmit">
    <b-field
        label="Login"
        :message="validateForm.loginMessage"
        :type="validateForm.loginType"    
    >
        <b-input
            v-on:input="onChange"
            v-model="user.login"
            placeholder="example@test.com"
            :class="{invalid: ($v.user.login.$dirty && !$v.user.login.required)}"
        >
        </b-input>
    </b-field>

    <b-field label="Password"
        :message="validateForm.passwordMessage"
        :type="validateForm.passwordType"   
    >
        <b-input
            v-model="user.password"
            type="password"
            placeholder="*********"
            v-on:input="onChange"
            :class="{invalid: 
                ($v.user.password.$dirty && !$v.user.password.required) ||
                ($v.user.password.$dirty && !$v.user.password.minLength)
            }"
        >
        </b-input>
    </b-field>

    <b-button
        native-type="submit"
        type="is-primary"
    >Sign in</b-button>

    <b-notification
        v-on:close="() => error.errorStatus=false"
        class="error-text"
        v-if="error.errorStatus"
        type="is-danger is-light"
        aria-close-label="Close notification"
        role="alert">
        {{error.errorMessage}}
    </b-notification>
</form>

</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            validateForm: {
                passwordMessage: '',
                loginMessage: '',
                passwordType: '',
                loginType: ''
            },
            user: {
                login: '',
                password: ''
            },
            error: {
                errorMessage: "",
                errorStatus: false
            },
        }
    },

    validations: {
        user:{
            login: {required},
            password: {required, minLength: minLength(6)}
        }
    },

    methods: {
        onChange() {
            console.log()
            if(!this.$v.user.login.$invalid) {
                this.validateForm.loginType = ''
                this.validateForm.loginMessage = ''
            }
            if(!this.$v.user.password.$invalid) {
                this.validateForm.passwordType = ''
                this.validateForm.passwordMessage = ''
            }
        },

        handleError(json) {
            if (json.code >= 400) {
                this.error.errorMessage = json.message
                this.error.errorStatus = true
            }
        },

        onSubmit() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                if(this.$v.user.login.$invalid) {
                    this.validateForm.loginMessage = 'Login is required'
                    this.validateForm.loginType = 'is-danger'
                }
                if(this.$v.user.password.$invalid) {
                    !this.$v.user.password.required ?
                        this.validateForm.passwordMessage = 'Password is required' :
                        this.validateForm.passwordMessage = 'Password length should be at least 6 characters'
                    this.validateForm.passwordType = 'is-danger'
                }
                return ;
            }
            const user = {
                login: this.login,
                password: this.password
            }
            fetch('https://api.dev.anyvoice.ru/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            })
            .then(data => data.json())
            .then(json => this.handleError(json))
            .catch(error => console.error(error))
        }
    }
}
</script>

<style scoped>
.error-text {
    margin-top: 1rem;
}
.box {
    width: 100%;
    max-width: 400px;
}
</style>