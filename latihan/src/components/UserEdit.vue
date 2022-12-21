<template>
    <div>
        <h1 class="title has-text-centered">Edit User</h1>
        <div class="field">
            <label class="label">User Name</label>
            <div class="control">
                <input class="input" type="text" placeholder="User Name" v-model="userName"/>
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
            <router-link :to="{ name: 'Index' }" class="button is-danger" style="margin-right:10px">Cancel</router-link>
            <button class="button is-warning" @click="updateUser">UPDATE</button>
        </div>
    </div>
</template>

<script>
    // import axios
    import axios from "axios";

    export default {
        name: "UserEdit",
        data() {
            return {
                userName : "",
                userEmail : "",
                userAddress : "",
                userPhone : "",
            };
        },
        created: function () {
            this.getUserById();
        },
        methods: {
            // Get User By Id
            async getUserById() {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/api/user/${this.$route.params.id}`
                    );
                    this.userName = response.data.user_name;
                    this.userEmail = response.data.user_email;
                    this.userAddress = response.data.user_address;
                    this.userPhone = response.data.user_phone;
                } catch (err) {
                    console.log(err);
                }
            },
            // Update User
            async updateUser() {
                try {
                    await axios.put(
                        `http://localhost:3000/api/user/${this.$route.params.id}`,
                        {
                            user_name    : this.userName.trim(),
                            user_email   : this.userEmail.trim(),
                            user_address : this.userAddress.trim(),
                            user_phone   : this.userPhone.trim()
                        }
                    );
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