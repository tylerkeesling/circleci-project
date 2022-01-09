<template>
  <b-container class="col-md-4 col-sm-10">
    <flip-card v-model="flipped">
      <template #front>
        <b-card>
          <b-img :src="require('../assets/twizzlers-logo.png')" height="80" />
          <h2 class="p-3">Registration</h2>
          <b-form @submit.prevent="onSubmit" v-if="show">
            <b-form-group
              id="input-group-first-name"
              label="Your Name:"
              label-for="input-first-name"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-first-name"
                v-model="form.firstName"
                placeholder="Your first name"
                label-cols-sm="3"
                label-align-sm="right"
                required
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-last-name"
              label="Last Name:"
              label-for="input-last-name"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-last-name"
                v-model="form.lastName"
                placeholder="Your last name"
                required
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-email"
              label="Email address:"
              label-for="input-email"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-label-email"
                v-model="form.email"
                type="email"
                placeholder="Your email address"
                required
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-password"
              label="Password"
              label-for="input-password"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-label-password"
                v-model="form.password"
                type="password"
                placeholder="Your password"
                label-cols-sm="3"
                label-align-sm="right"
                required
                autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-button class="float-right" type="submit" variant="primary">
              Submit
            </b-button>
          </b-form>
        </b-card>
      </template>
      <template #back>
        <b-card title="Please scan the QR code with Okta Verify">
          <b-img :src="qrcode" />
        </b-card>
      </template>
    </flip-card>
  </b-container>
</template>

<script>
import users from '../services/UsersService';
import FlipCard from '../components/FlipCard';

export default {
  components: {
    FlipCard,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      flipped: true,
      qrcode:
        'https://dev-76476905.okta.com/api/v1/users/00u3jk50nzyKXK1F45d7/factors/opf3jk45h7BrV0fq55d7/qr/20111TlU0jdGqELTWkk8slgsyEKiJbsz0InOoqkhIyPbhcnEdz5FA5S',
      show: true,
      dontShow: false,
    };
  },
  computed: {
    showQrCode() {
      return !this.qrcode;
    },
  },
  methods: {
    async onSubmit(evt) {
      try {
        await users.register(this.form);
        const transaction = await this.$auth.signInWithCredentials({
          username: this.form.email,
          password: this.form.password,
        });

        if (transaction.status === 'MFA_ENROLL') {
          const factor = transaction.factors.find(function (factor) {
            return factor.provider === 'OKTA' && factor.factorType === 'push';
          });

          const enroll = await factor.enroll();

          const qrCode = enroll.factor.activation.qrcode.href;
          this.qrcode = qrCode;
          this.flipped = true;
          const polling = await enroll.poll();
          const tokens = await this.$auth.token.getWithoutPrompt({
            sessionToken: polling.sessionToken,
          });

          this.$auth.handleLoginRedirect(
            tokens.tokens,
            window.location.origin + 'login/callback'
          );
        }
      } catch (error) {
        console.log('THIS IS MY ERROR', error);
      }
    },
  },
};
</script>
