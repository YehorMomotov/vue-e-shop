<template>
  <div class="e-footer">
    <div class="e-footer__content main-width" @click="showContent">
      <div class="e-footer__about inner-footer-content">
        <h1>About us</h1>
        <router-link :to="{ name: 'main' }" class="text-content"
          >Main</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >History</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Mission</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Charity</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Advertising</router-link
        >
      </div>
      <div class="e-footer__cowork inner-footer-content">
        <h1>Work</h1>
        <router-link :to="{ name: 'main' }" class="text-content"
          >Vacancy</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Start working</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Portfolio</router-link
        >
      </div>
      <div class="e-footer__advertising inner-footer-content">
        <h1>Services</h1>
        <router-link :to="{ name: 'main' }" class="text-content"
          >Takeaway food</router-link
        >
        <router-link :to="{ name: 'main' }" class="text-content"
          >Customise burger</router-link
        >
      </div>
      <div class="e-footer__contants inner-footer-content">
        <h1>Contacts</h1>
        <span class="span-content"
          ><i class="material-icons">email</i>:
          officialmomotov@gmail.com</span
        >
        <span class="span-content"
          ><i class="material-icons">print</i>: +38 (050) 111-11-11</span
        >
        <span class="span-content"
          ><i class="material-icons">phone</i>: +38 (050) 644-43-22</span
        >
        <span class="span-content">
          <i class="material-icons">map</i>
          <a
            href="https://www.google.com/maps?q=kharkiv&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjBpILq6Kz4AhXkk4sKHSFmCmYQ_AUoAXoECAIQAw"
            >: Kharkiv</a
          >
        </span>
        <span class="span-content"
          ><i class="material-icons">telegram</i>: @st_mev</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "e-footer",
  methods: {
    showContent() {
      if (
        event.target.tagName === "H1" ||
        event.target.tagName === "SPAN"
      ) {
        if (!event.target.parentElement.classList.contains("show")) {
          event.target.parentNode.parentNode.childNodes.forEach(
            (element) => {
              element.classList.remove("show");
            }
          );
          event.target.parentElement.classList.add("show");
        } else {
          event.target.parentElement.classList.remove("show");
        }
      }
    },
  },
};
</script>

<style lang="scss">
.text-content {
  margin: 4px;
}
.span-content {
  padding-bottom: $padding/2;
  a {
    text-decoration: none;
    color: inherit;
  }
  display: flex;
}

.e-footer {
  text-align: left;
  background: $sandy_beach;
  padding-top: $padding * 3;
  padding-bottom: $padding * 3;
  width: 100%;
  &__content {
    padding-top: $padding;
    padding-bottom: $padding;
    margin: 0 auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    .inner-footer-content {
      transition: 1s all ease-in-out;
      font-size: 1.2em;
      display: flex;
      flex-direction: column;
      h1 {
        margin-bottom: 3px;
      }
    }
    .show {
      .span-content,
      .text-content {
        opacity: 1;
        max-height: min-content;
        transition: 1s all ease;
      }
      .text-content {
        margin: 4px;
      }
      .span-content {
        padding-bottom: $padding/2;
      }
    }
  }
  h1 {
    margin: 0;
  }
  @media only screen and (max-width: 768px) {
    .e-footer {
      &__content {
        flex-direction: column;
        align-items: center;
        text-align: center;
        .inner-footer-content {
          align-items: center;
          h1 {
            font-size: 1.2em;
            z-index: 1;
          }
        }
      }
    }
    .text-content,
    .span-content {
      &:hover {
        background: transparent;
      }
      z-index: 0;
      opacity: 0;
      max-height: 0;
      margin: 0;
      font-size: 0.6em;
      padding: 0;
    }
  }
}
</style>
