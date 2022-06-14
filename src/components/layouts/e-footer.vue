<template>
  <div class="e-footer">
    <div class="e-footer__content">
      <div class="e-footer__about inner-footer-content">
        <h1>About us</h1>
        <p>Main</p>
        <p>History</p>
        <p>Mission</p>
        <p>Charity</p>
        <p>Advertising</p>
      </div>
      <div class="e-footer__cowork inner-footer-content">
        <h1>Work</h1>
        <p>Vacations</p>
        <p>Start working</p>
        <p>Portfolio</p>
      </div>
      <div class="e-footer__advertising inner-footer-content">
        <h1>Services</h1>
        <p>Takeaway food</p>
        <p>Customise burger</p>
      </div>
      <div class="e-footer__contants inner-footer-content">
        <h1>Contacts</h1>
        <span
          ><i class="material-icons">email</i>:
          officialmomotov@gmail.com</span
        >
        <span
          ><i class="material-icons">print</i>: +38 (050) 111-11-11</span
        >
        <span
          ><i class="material-icons">phone</i>: +38 (050) 644-43-22</span
        >
        <span>
          <i class="material-icons">map</i>
          <a
            href="https://www.google.com/maps?q=kharkiv&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjBpILq6Kz4AhXkk4sKHSFmCmYQ_AUoAXoECAIQAw"
            >: Kharkiv</a
          >
        </span>
        <span><i class="material-icons">telegram</i>: @st_mev</span>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "e-footer" };
</script>

<style lang="scss">
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
    max-width: $body_width + 2 * $padding;
    .inner-footer-content {
      font-size: 1.2em;
      display: flex;
      flex-direction: column;
      p {
        margin: 4px;
      }
      span {
        padding-bottom: $padding/2;
        a {
          text-decoration: none;
          color: inherit;
        }
        display: flex;
      }
    }
  }
  h1 {
    margin: 0;
  }
}
</style>
