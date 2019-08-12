workflow "Main" {
  on = "push"
  resolves = ["Release"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run test -- --coverage"
  needs = ["Install"]
}

action "Release" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run release"
  secrets = [
    "GITHUB_TOKEN",
    "NPM_AUTH_TOKEN",
  ]
  needs = ["Test"]
}
