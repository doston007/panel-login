const api = axios.create({
  baseURL: "https://api2dev.vdsina.ru",
});

const alias = {
  "main/email": "Email",
  "main/password": "Пароль",
  "login/remember_me": "Запомнить меня",
};

const loginForm = new Vue({
  el: "#loginForm",
  data: function () {
    return {
      formData: null,
      isSubmiting: false,
			formResponse: null,
      alias,
    };
  },
  methods: {
    loginSubmit() {
      if (this.isSubmiting) return;
      this.isSubmiting = true;
      const formData = new FormData(document.forms[this.formData.model]);
      api.post("/login", formData).then(response => {
				this.formResponse = response.data
			}).catch(error => {
				this.formResponse = error.response.data
			}).finally(() => {
        this.isSubmiting = false;
      });
    },
    fetchLoginData() {
      return api.get("/login").then((response) => {
        this.formData = JSON.parse(JSON.stringify(response.data));
      });
    },
  },
  created() {
    this.fetchLoginData();
  },
});
