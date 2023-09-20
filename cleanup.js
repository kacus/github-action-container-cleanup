try {
  console.log(`cleanup job`);
} catch (error) {
  core.setFailed(error.message);
}

