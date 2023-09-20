try {
  console.log(`hello world`);
} catch (error) {
  core.setFailed(error.message);
}

