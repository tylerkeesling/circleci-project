<template>
  <b-container>
    <h1>Registration</h1>
    <b-row>
      <b-col></b-col>
      <b-col>
        <b-form @submit.prevent="onSubmit" v-if="show">
          <b-form-group
            id="input-group-first-name"
            label="Your Name:"
            label-for="input-first-name"
          >
            <b-form-input
              id="input-first-name"
              v-model="form.firstName"
              placeholder="Your first name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-last-name"
            label="Last Name:"
            label-for="input-last-name"
          >
            <b-form-input
              id="input-last-name"
              v-model="form.lastName"
              placeholder="Your last name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-email"
            label="Email address:"
            label-for="input-email"
          >
            <b-form-input
              id="input-label-email"
              v-model="form.email"
              type="email"
              placeholder="Your email address"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-password"
            label="Password"
            label-for="input-password"
          >
            <b-form-input
              id="input-label-password"
              v-model="form.password"
              type="password"
              placeholder="Your password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row> </b-row>
  </b-container>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  data() {
    return {
      form: {
        firstName: 'Scott',
        lastName: 'W',
        email: 'Tyler@mailinator.com',
        password: 'AnythingYouWant123',
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        console.log(this.$auth);
        await UserService.register(this.form);
        const user = await this.$auth.signInWithCredentials({
          username: this.form.email,
          password: this.form.password,
        });

        console.log('user', user);

        const getWithoutPrompt = await this.$auth.token.getWithoutPrompt({
          responseType: ['id_token', 'access_token'],
          sessionToken: user.data.sessionToken,
        });

        console.log('getWithoutPrompt', getWithoutPrompt);

        // await this.$auth.tokenManager.setTokens(getWithoutPrompt.tokens);

        await this.$auth.handleLoginRedirect(getWithoutPrompt.tokens);
      } catch (error) {
        console.log('THIS IS MY ERROR', error);
      }
    },
  },
};
</script>
