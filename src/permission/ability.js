import { Ability, AbilityBuilder } from "@casl/ability";
import { getStore } from "store";

const store = getStore();
// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

const ability = new Ability([], { subjectName });

let currentAuth;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().app.role;
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});

function defineRulesFor(auth) {
  const { can, rules } = new AbilityBuilder();
  if (auth === "admin") {
    can("access", "manage-user");
    can("access", "manage-request");
    can("access", "manage-server");
    can("access", "manage-customer");
    can("approve-cancel", "request");
    can("export", "request");
  } else if (auth === "normal-user") {
    can("access", "manage-request");
  } else if (auth === "dc-member") {
    can("access", "manage-request");
    can("access", "manage-server");
    can("approve-cancel", "request");
    can("export", "request");
  } else if (auth === "contact-point") {
    can("access", "manage-customer");
    can("access", "manage-request");
  }
  return rules;
}

export default ability;
