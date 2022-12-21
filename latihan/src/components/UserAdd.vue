<template>
    <div>
        <h1 class="title has-text-centered">Add User</h1>
        <div class="field">
            <label class="label">User Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Name" v-model="userName" autofocus/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Email</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Email" v-model="userEmail"/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Address</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Address" v-model="userAddress"/>
            </div>
        </div>
        <div class="field">
            <label class="label">User Phone</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Phone" v-model="userPhone"/>
            </div>
        </div>
        <div class="control">
            <router-link :to="{ name: 'Index' }" class="button is-info" style="margin-right:10px">Back</router-link>
            <button class="button is-success" @click="saveUser">SAVE</button>
        </div>
    </div>
</template>

<script>
    // import axios
    import axios from "axios";

    export default {
        name: "UserAdd",
        data() {
            return {
                userName : "",
                userEmail : "",
                userAddress : "",
                userPhone : "",
            };
        },
        methods: {
            // Create New User
            async saveUser() {
                try {
                    await axios.post("http://localhost:3000/api/user", {
                        user_name    : this.userName.trim(),
                        user_email   : this.userEmail.trim(),
                        user_address : this.userAddress.trim(),
                        user_phone   : this.userPhone.trim()
                    });
                    this.userName = "";
                    this.userEmail = "";
                    this.userAddress = "";
                    this.userPhone = "";
                    this.$router.push("/");
                } catch (err) {
                    console.log(err);
                }
            },
        },
    };
</script>

<style>
</style>