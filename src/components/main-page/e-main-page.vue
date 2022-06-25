<template>
  <div>
    <div class="main-top">
      <h1>Wellcome to Є-Крамниця store!</h1>
      <h2>
        Here you can order some fast-food that we serve. <br />
        You can make burger by your own recipe. <br />
        If you cant pick up the order yourself we can deliver it to you,
        just point adress when confirming your order.
      </h2>
    </div>
    <div class="about" @click="showP">
      <h1>About company</h1>
      <div class="about__mainly about__el">
        <h2>Mainly</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Recusandae, veritatis dolores? Numquam quia facere dolorem sed
          amet, debitis sapiente? Provident ad quo sunt quisquam inventore
          aspernatur ipsa non officia minus?Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Dicta veritatis dolores voluptates
          minima ipsum non esse fugiat adipisci sit aspernatur repudiandae,
          soluta voluptas eligendi maxime ut possimus placeat
          exercitationem dolorem. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Totam nisi molestias deserunt autem dignissimos
          architecto enim officia dolorum omnis distinctio, dolor ab
          laboriosam fugit iste ea est quas soluta rem? Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Atque ab quisquam ea.
          Reiciendis recusandae rem nostrum. Quae, nihil accusantium quas
          consequuntur non recusandae laborum. Perferendis quisquam laborum
          non porro. Tempore. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Aspernatur cum reprehenderit quae consequuntur
          velit commodi accusamus, dolorem aliquid unde provident cumque
          alias debitis ullam consequatur earum asperiores! Inventore,
          minima impedit.
        </p>
      </div>
      <div class="about__history about__el">
        <h2>History</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
          aperiam qui repellat, earum maiores possimus labore minus itaque
          doloribus ea quisquam rem accusamus quaerat vel voluptatum quod
          autem quasi adipisci? Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Commodi non beatae ipsam voluptatibus quod
          laudantium! Nostrum cum, doloribus, facere et non, officiis alias
          a provident illum dolorum molestiae similique perspiciatis.
        </p>
      </div>
      <div class="about__misson about__el">
        <h2>Mission</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Voluptas culpa provident, repudiandae hic iure corporis
          dignissimos minus in, porro assumenda obcaecati quaerat sit
          magnam architecto consequuntur. Totam quibusdam minima impedit!
          Vero earum ex a. Quaerat eaque ullam consequuntur, aperiam
          dolores deserunt culpa asperiores omnis animi, beatae aliquam
          laudantium voluptatibus maxime illo? Distinctio, reiciendis!
          Vitae, non aspernatur officiis cumque itaque debitis! Odit quod
          similique, hic sit neque sequi laudantium illo recusandae tempore
          quidem, delectus, quo unde. Ratione fuga, veniam porro temporibus
          repellendus harum quidem illum assumenda, neque dicta dignissimos
          veritatis doloribus. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam maiores quod, sint praesentium
          similique in quo asperiores sed ratione molestias illum maxime.
          Aut doloribus, quis ea placeat a consequatur itaque?
        </p>
      </div>
      <div class="about__charity about__el">
        <h2>Charity</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
          earum quos tenetur repellat? Iste libero deserunt magni deleniti
          accusantium molestiae qui suscipit non adipisci nostrum? Dolorem
          excepturi quos iste maiores. Est et reiciendis veritatis eius
          ratione accusantium praesentium debitis quas aperiam error
          quisquam, suscipit nulla quaerat! Possimus fugiat corporis sit
          amet consequuntur incidunt, asperiores similique sequi
          necessitatibus, doloribus iusto deleniti?
        </p>
      </div>
      <div class="about__advertising about__el">
        <h2>Advertising</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Sapiente dolorum, nisi excepturi itaque dolor delectus at,
          necessitatibus quaerat autem consequuntur suscipit. Dolores iusto
          fuga hic odio placeat voluptate, ipsam quos.
        </p>
        <p>Check contact information in footer for more information.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "e-main-page",
  methods: {
    showP() {
      if (event.target.tagName === "H2") {
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
.main-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.about {
  display: flex;
  flex-direction: column;
  margin-left: $margin;
  margin-right: $margin * 4;
  h1 {
    font-size: 2em;
    text-align: left;
    margin-left: $margin * 2;
  }
  h2 {
    font-size: 1.6em;
    text-align: left;
  }
  &__el {
    margin-left: $margin * 5;
    text-align: justify;
    p {
      margin-left: $margin * 5;
    }
  }
}
@media screen and (max-width: 768px) {
  .about {
    margin-left: $margin;
    margin-right: $margin;
    h1 {
      font-size: 2em;
      text-align: left;
      margin-left: 0;
    }
    &__el {
      z-index: 5;
      margin-left: $margin / 2;
      padding: $padding;
      &:hover {
        background: $sandy_beach;
      }
      h2 {
        padding: $padding * 2;
        padding-left: 0;
        margin: 0;
      }
      text-align: justify;
      p {
        display: none;
        margin-left: $margin / 2;
      }
    }
  }
}
.show {
  p {
    display: block;
  }
}
</style>
