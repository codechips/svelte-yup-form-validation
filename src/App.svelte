<style>
  form * + * {
    margin-top: 1em;
  }
</style>

<script>
  import { regSchema } from './schema';

  let values = {};
  let errors = {};

  const extractErrors = err => {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  };

  const submitHandler = async () => {
    try {
      await regSchema.validate(values, { abortEarly: false });
      alert(JSON.stringify(values, null, 2));
      errors = {};
    } catch (err) {
      errors = extractErrors(err);
    }
  };
</script>

<div>
  <h1>Please register</h1>
  <form on:submit|preventDefault={submitHandler}>
    <div>
      <input
        type="text"
        name="name"
        bind:value={values.name}
        placeholder="Your name"
      />
      {#if errors.name}{errors.name}{/if}
    </div>
    <div>
      <input
        type="text"
        name="email"
        bind:value={values.email}
        placeholder="Your email"
      />
      {#if errors.email}{errors.email}{/if}
    </div>
    <div>
      <input
        type="text"
        name="username"
        bind:value={values.username}
        placeholder="Choose username"
      />
      {#if errors.username}{errors.username}{/if}
    </div>
    <div>
      <input
        type="password"
        name="password"
        bind:value={values.password}
        placeholder="Password"
      />
      {#if errors.password}{errors.password}{/if}
    </div>
    <div>
      <input
        type="password"
        name="passwordConfirm"
        bind:value={values.passwordConfirm}
        placeholder="Confirm password"
      />
      {#if errors.passwordConfirm}{errors.passwordConfirm}{/if}
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>
</div>
