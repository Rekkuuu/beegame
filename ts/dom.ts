const $ = (x: string) => document.getElementById(x) as HTMLElement;

const d = {
  flowers: $("flowers"),
  pollen: $("pollen"),
  nectar: $("nectar"),
  honey: $("honey"),

  flowersPS: $("flowersPS"),
  pollenPS: $("pollenPS"),
  nectarPS: $("nectarPS"),
  honeyPS: $("honeyPS"),

  freeBees: $("freeBees"),
  foragerBees: $("foragerBees"),
  honeyBees: $("honeyBees"),

  flowerFields: $("flowerFields"),
  flowerFieldPrice: $("flowerFieldPrice"),
  buyFlowerField: $("buyFlowerField") as HTMLButtonElement,
  quickBuyFlowerField: $("slowBuyFlowerField") as HTMLButtonElement,
  bees: $("bees"),
  beePrice: $("beePrice"),
  buyBee: $("buyBee") as HTMLButtonElement,
  quickBuyBee: $("quickBuyBee") as HTMLButtonElement,
  hives: $("hives"),
  hivePrice: $("hivePrice"),
  buyHive: $("buyHive") as HTMLButtonElement,
  quickBuyHive: $("quickBuyHive") as HTMLButtonElement,

  set0ForagerBees: $("set0ForagerBees") as HTMLButtonElement,
  minusForagerBees: $("minusForagerBees") as HTMLButtonElement,
  plusForagerBees: $("plusForagerBees") as HTMLButtonElement,
  maxForagerBees: $("maxForagerBees") as HTMLButtonElement,
  set0HoneyBees: $("set0HoneyBees") as HTMLButtonElement,
  minusHoneyBees: $("minusHoneyBees") as HTMLButtonElement,
  plusHoneyBees: $("plusHoneyBees") as HTMLButtonElement,
  maxHoneyBees: $("maxHoneyBees") as HTMLButtonElement,

  // requiredBeesToSacrifice: $("requiredBeesToSacrifice"),

  sacrificeToPollenGod: $("sacrificeToPollenGod") as HTMLButtonElement,
  sacrificeToNectarGod: $("sacrificeToNectarGod") as HTMLButtonElement,
  sacrificeToHoneyGod: $("sacrificeToHoneyGod") as HTMLButtonElement,
  sacrificeToFlowerGod: $("sacrificeToFlowerGod") as HTMLButtonElement,
  sacrificeToCapitalistGod: $("sacrificeToCapitalistGod") as HTMLButtonElement,

  pollenGodTributesToGet: $("pollenGodTributesToGet"),
  nectarGodTributesToGet: $("nectarGodTributesToGet"),
  honeyGodTributesToGet: $("honeyGodTributesToGet"),
  flowerGodTributesToGet: $("flowerGodTributesToGet"),
  capitalistGodTributesToGet: $("capitalistGodTributesToGet"),

  // pollenGodTributes: $("pollenGodTributes"),
  // nectarGodTributes: $("nectarGodTributes"),
  // honeyGodTributes: $("honeyGodTributes"),
  // flowerGodTributes: $("flowerGodTributes"),
  // capitalistGodTributes: $("capitalistGodTributes"),

  nextPollenGodTribute: $("nextPollenGodTribute"),
  nextNectarGodTribute: $("nextNectarGodTribute"),
  nextHoneyGodTribute: $("nextHoneyGodTribute"),
  nextFlowerGodTribute: $("nextFlowerGodTribute"),
  nextCapitalistGodTribute: $("nextCapitalistGodTribute"),

  beesWrapper: $("beesWrapper"),
  sacrificeWrapper: $("sacrificeWrapper"),
  flowerFieldsEffect: $("flowerFieldsEffect"),
  hivesEffect: $("hivesEffect"),
  beesEffect: $("beesEffect"),

  flowerPSStat: $("flowerPSStat"),
  pollenPSStat: $("pollenPSStat"),
  nectarPSStat: $("nectarPSStat"),
  honeyPSStat: $("honeyPSStat"),
  beehiveSpaceEffectStat: $("beehiveSpaceEffectStat"),
  beeSpaceEffectStat: $("beeSpaceEffectStat"),

  beehiveSpaceEffectStatS: $("beehiveSpaceEffectStatS"),
  beeSpaceEffectStatS: $("beeSpaceEffectStatS"),

  totalTributes: $("totalTributes"),
  // neededBeesToSacrifice: $("neededBeesToSacrifice"),

  // totalBeesToSacrificeFromTributes: $("totalBeesToSacrificeFromTributes"),
  pollenGodTributesAfterSacrifice: $("pollenGodTributesAfterSacrifice"),
  nectarGodTributesAfterSacrifice: $("nectarGodTributesAfterSacrifice"),
  honeyGodTributesAfterSacrifice: $("honeyGodTributesAfterSacrifice"),
  flowerGodTributesAfterSacrifice: $("flowerGodTributesAfterSacrifice"),
  capitalistGodTributesAfterSacrifice: $("capitalistGodTributesAfterSacrifice"),

  money: $("money"),
  moneyPS: $("moneyPS"),

  m: {
    0: $("m0"),
    1: $("m1"),
    2: $("m2"),
    3: $("m3"),
    4: $("m4"),
    5: $("m5"),
    6: $("m6"),
    7: $("m7"),
    8: $("m8"),
    9: $("m9"),
    10: $("m10"),
    11: $("m11"),
    12: $("m12"),
    13: $("m13"),
    14: $("m14"),
  },

  m0e: $("m0e"),
  m1e: $("m1e"),
  m2e: $("m2e"),
  m3e: $("m3e"),
  m4e: $("m4e"),
  m5e: $("m5e"),
  m6e: $("m6e"),
  m7e: $("m7e"),
  m8e: $("m8e"),
  m9e: $("m9e"),
  m10e: $("m10e"),
  m11e: $("m11e"),
  m12e: $("m12e"),
  m13e: $("m13e"),
  m14e: $("m14e"),

  m0d: $("m0d"),
  m1d: $("m1d"),
  m2d: $("m2d"),
  m3d: $("m3d"),
  m4d: $("m4d"),
  m5d: $("m5d"),
  m6d: $("m6d"),
  m7d: $("m7d"),
  m8d: $("m8d"),
  m9d: $("m9d"),
  m10d: $("m10d"),
  m11d: $("m11d"),
  m12d: $("m12d"),
  m13d: $("m13d"),
  m14d: $("m14d"),

  m0t: $("m0t"),
  m1t: $("m1t"),
  m2t: $("m2t"),
  m3t: $("m3t"),
  m4t: $("m4t"),
  m5t: $("m5t"),
  m6t: $("m6t"),
  m7t: $("m7t"),
  m8t: $("m8t"),
  m9t: $("m9t"),
  m10t: $("m10t"),
  m11t: $("m11t"),
  m12t: $("m12t"),
  m13t: $("m13t"),
  m14t: $("m14t"),

  // m7effect: $("m6effect"),
  honeyCheckBox: $("honeyCheckBox") as HTMLInputElement,

  // reqBeesToSacTitle: $("reqBeesToSacTitle"),
  pernamentTributeEffects: $("pernamentTributeEffects"),
  gameCompletion: $("gameCompletion"),

  flowerswrapper: $("flowerswrapper"),
  pollenwrapper: $("pollenwrapper"),
  nectarwrapper: $("nectarwrapper"),
  honeywrapper: $("honeywrapper"),
  moneywrapper: $("moneywrapper"),
  beeswrapper: $("beeswrapper"),
  hivewrapper: $("hivewrapper"),

  foragerbeestext: $("foragerbeestext"),
  honeybeestext: $("honeybeestext"),

  foragerbeeswrapper: $("foragerbeeswrapper"),
  honeybeeswrapper: $("honeybeeswrapper"),
  flowerfieldwrapper: $("flowerfieldwrapper"),
  quickbuyhivewrapper: $("quickbuyhivewrapper"),
  tributeswrapper: $("tributeswrapper"),

  flowerpsstatwrapper: $("flowerpsstatwrapper"),
  foragerstatwrapper: $("foragerstatwrapper"),
  honeybeestatwrapper: $("honeybeestatwrapper"),
  beehivestatwrapper: $("beehivestatwrapper"),
  fifthbeestatwrapper: $("fifthbeestatwrapper"),
  recomendedFlowers: $("recomendedFlowers"),
  disaplyeverything: $("disaplyeverything") as HTMLInputElement,

  pollengodwrapper: $("pollengodwrapper"),
  nectargodwrapper: $("nectargodwrapper"),
  honeygodwrapper: $("honeygodwrapper"),
  flowergodwrapper: $("flowergodwrapper"),
  capitalistgodwrapper: $("capitalistgodwrapper"),

  foragerbeestextunderline: $("foragerbeestextunderline"),
  honeybeestextunderline: $("honeybeestextunderline"),

  autosaves: $("autosaves") as HTMLInputElement,

  saveButton: $("saveButton"),
  loadButton: $("loadButton"),

  ticksLeft: $("ticksLeft"),
  offlineTicks: $("offlineTicks"),

  flowerConsumptionStat: $("flowerConsumptionStat"),
  nectarConsumptionStat: $("nectarConsumptionStat"),
  honeyWorthStat: $("honeyWorthStat"),

  offlineTicksSpeed2: $("offlineTicksSpeed2") as HTMLInputElement,
  offlineTicksSpeed5: $("offlineTicksSpeed5") as HTMLInputElement,
  offlineTicksSpeed10: $("offlineTicksSpeed10") as HTMLInputElement,

  honeystatwrapper: $("honeystatwrapper"),

  toggleDarkmode: $("toggleDarkmode") as HTMLInputElement,
  body: document.querySelector("body") as HTMLBodyElement,
  toggleBigButtons: $("toggleBigButtons") as HTMLInputElement,

  mainTabButton: $("mainTabButton") as HTMLButtonElement,
  jellyTabButton: $("jellyTabButton") as HTMLButtonElement,
  godsTabButton: $("godsTabButton") as HTMLButtonElement,
  statshelpTabButton: $("statshelpTabButton") as HTMLButtonElement,
  settingsTabButton: $("settingsTabButton") as HTMLButtonElement,

  mainTabContent: $("mainTabContent"),
  jellyTabContent: $("jellyTabContent"),
  godsTabContent: $("godsTabContent"),
  statshelpTabContent: $("statshelpTabContent"),
  settingsTabContent: $("settingsTabContent"),

  saveButton2: $("saveButton2") as HTMLButtonElement,
  loadButton2: $("loadButton2") as HTMLButtonElement,

  RJfrompollen: $("RJfrompollen"),
  RJfromnectar: $("RJfromnectar"),
  RJfromhoney: $("RJfromhoney"),
  RJfromflowers: $("RJfromflowers"),
  RJfrommoney: $("RJfrommoney"),

  totalflowers: $("totalflowers"),
  totalpollen: $("totalpollen"),
  totalnectar: $("totalnectar"),
  totalhoney: $("totalhoney"),
  totalmoney: $("totalmoney"),

  RJToGet: $("RJToGet"),
  RJToGet2: $("RJToGet2"),

  RJExchangeResets: $("RJExchangeResets"),

  buyMaxFlowerField: $("buyMaxFlowerField") as HTMLButtonElement,
  buyMaxBee: $("buyMaxBee") as HTMLButtonElement,
  buyMaxHive: $("buyMaxHive") as HTMLButtonElement,

  buyMaxFlowerFieldAmount: $("buyMaxFlowerFieldAmount"),
  buyMaxFlowerFieldS: $("buyMaxFlowerFieldS"),
  buyMaxFlowerFieldPrice: $("buyMaxFlowerFieldPrice"),

  buyMaxBeeAmount: $("buyMaxBeeAmount"),
  buyMaxBeeS: $("buyMaxBeeS"),
  buyMaxBeePrice: $("buyMaxBeePrice"),

  buyMaxHiveAmount: $("buyMaxHiveAmount"),
  buyMaxHiveS: $("buyMaxHiveS"),
  buyMaxHivePrice: $("buyMaxHivePrice"),

  // beeReqString: $("beeReqString"),

  RJ: $("RJ"),
  RJtotal: $("RJtotal"),
  RJtotalBoost: $("RJtotalBoost"),
  RJBoost: $("RJBoost"),

  RJflowerFields: $("RJflowerFields"),
  RJbees: $("RJbees"),
  RJhives: $("RJhives"),

  RJbuyflowerFields: $("RJbuyflowerFields") as HTMLButtonElement,
  RJbuybees: $("RJbuybees") as HTMLButtonElement,
  RJbuyhives: $("RJbuyhives") as HTMLButtonElement,

  // RJsellflowerFields: $("RJsellflowerFields") as HTMLButtonElement,
  // RJsellbees: $("RJsellbees") as HTMLButtonElement,
  // RJsellhives: $("RJsellhives") as HTMLButtonElement,

  RJfrombuyflowerFields: $("RJfrombuyflowerFields"), // bad name?
  RJfromsellflowerFields: $("RJfromsellflowerFields"), // bad name?
  RJfrombuybees: $("RJfrombuybees"), // bad name?
  RJfromsellbees: $("RJfromsellbees"), // bad name?
  RJfrombuyhives: $("RJfrombuyhives"), // bad name?
  RJfromsellhives: $("RJfromsellhives"), // bad name?

  buyTribute: $("buyTribute") as HTMLButtonElement,
  buyMaxTribute: $("buyMaxTribute") as HTMLButtonElement,

  RJTributes: $("RJTributes"),
  RJtotalTributes: $("RJtotalTributes"),
  tributePrice: $("tributePrice"),
  buyMaxTributeAmount: $("buyMaxTributeAmount"),
  buyMaxTributeS: $("buyMaxTributeS"),
  buyMaxTributePrice: $("buyMaxTributePrice"),

  addpollenGodTribute: $("addpollenGodTribute") as HTMLButtonElement,
  removepollenGodTribute: $("removepollenGodTribute") as HTMLButtonElement,
  addnectarGodTribute: $("addnectarGodTribute") as HTMLButtonElement,
  removenectarGodTribute: $("removenectarGodTribute") as HTMLButtonElement,
  addhoneyGodTribute: $("addhoneyGodTribute") as HTMLButtonElement,
  removehoneyGodTribute: $("removehoneyGodTribute") as HTMLButtonElement,
  addflowerGodTribute: $("addflowerGodTribute") as HTMLButtonElement,
  removeflowerGodTribute: $("removeflowerGodTribute") as HTMLButtonElement,
  addcapitalistGodTribute: $("addcapitalistGodTribute") as HTMLButtonElement,
  removecapitalistGodTribute: $("removecapitalistGodTribute") as HTMLButtonElement,

  RJpollenGodTributes: $("RJpollenGodTributes"),
  RJnectarGodTributes: $("RJnectarGodTributes"),
  RJhoneyGodTributes: $("RJhoneyGodTributes"),
  RJflowerGodTributes: $("RJflowerGodTributes"),
  RJcapitalistGodTributes: $("RJcapitalistGodTributes"),

  tmpRJpollenGodTributes: $("tmpRJpollenGodTributes"),
  tmpRJnectarGodTributes: $("tmpRJnectarGodTributes"),
  tmpRJhoneyGodTributes: $("tmpRJhoneyGodTributes"),
  tmpRJflowerGodTributes: $("tmpRJflowerGodTributes"),
  tmpRJcapitalistGodTributes: $("tmpRJcapitalistGodTributes"),

  exchangeForRJ: $("exchangeForRJ") as HTMLButtonElement,

  tmpunusedRJTributes: $("tmpunusedRJTributes"),

  totalRJTributes: $("totalRJTributes"),

  exchangeToApplyChanges: $("exchangeToApplyChanges"),

  export: $("export") as HTMLButtonElement,
  import: $("import") as HTMLButtonElement,

  pernamentTributeEffectsLabel: $("pernamentTributeEffectsLabel"),

  RJWrapper: $("RJWrapper"),
  RJWrapper2: $("RJWrapper2"),
  RJWrapper3: $("RJWrapper3"),

  favicon: $("favicon") as HTMLLinkElement,
  iconMove: $("iconMove") as HTMLInputElement,

  nextPollenGodTributeBees: $("nextPollenGodTributeBees"),
  nextNectarGodTributeBees: $("nextNectarGodTributeBees"),
  nextHoneyGodTributeBees: $("nextHoneyGodTributeBees"),
  nextFlowerGodTributeBees: $("nextFlowerGodTributeBees"),
  nextCapitalistGodTributeBees: $("nextCapitalistGodTributeBees"),

  combinePGButton: $("combinePGButton") as HTMLButtonElement,
  combineNGButton: $("combineNGButton") as HTMLButtonElement,
  combineFGButton: $("combineFGButton") as HTMLButtonElement,
  combineHGButton: $("combineHGButton") as HTMLButtonElement,
  combineCGButton: $("combineCGButton") as HTMLButtonElement,

  confirmCombine: $("confirmCombine") as HTMLButtonElement,

  hardreset: $("hardreset") as HTMLButtonElement,

  lastRJfromflowers: $("lastRJfromflowers"),
  lastRJfrompollen: $("lastRJfrompollen"),
  lastRJfromnectar: $("lastRJfromnectar"),
  lastRJfromhoney: $("lastRJfromhoney"),
  lastRJfrommoney: $("lastRJfrommoney"),

  RJlastReset: $("RJlastReset"),

  sacrificeConfirmation: $("sacrificeConfirmation") as HTMLInputElement,
  exchangeConfirmation: $("exchangeConfirmation") as HTMLInputElement,
  toggleHoneyOfflineTime: $("toggleHoneyOfflineTime") as HTMLInputElement,
  toggleSacrificeOfflineTime: $("toggleSacrificeOfflineTime") as HTMLInputElement,
  toggleRJOfflineTime: $("toggleRJOfflineTime") as HTMLInputElement,

  equalResources: $("equalResources") as HTMLButtonElement,

  maxForagerProduction: $("maxForagerProduction") as HTMLButtonElement,
  maxHoneyProduction: $("maxHoneyProduction") as HTMLButtonElement,

  autoStructures: $("autoStructures") as HTMLInputElement,
  autoflowerBuyPercent: $("autoflowerBuyPercent") as HTMLInputElement,
  autobeeBuyPercent: $("autobeeBuyPercent") as HTMLInputElement,
  autohiveBuyPercent: $("autohiveBuyPercent") as HTMLInputElement,

  autoflowerBuy: $("autoflowerBuy") as HTMLInputElement,
  autobeeBuy: $("autobeeBuy") as HTMLInputElement,
  autohiveBuy: $("autohiveBuy") as HTMLInputElement,
  quickautoflowerBuy: $("quickautoflowerBuy") as HTMLInputElement,
  quickautobeeBuy: $("quickautobeeBuy") as HTMLInputElement,
  quickautohiveBuy: $("quickautohiveBuy") as HTMLInputElement,

  autoflowerWrapper: $("autoflowerWrapper"),
  autoflowerWrapper2: $("autoflowerWrapper2"),
  autobeeWrapper: $("autobeeWrapper"),
  autobeeWrapper2: $("autobeeWrapper2"),
  autohiveWrapper: $("autohiveWrapper"),
  autohiveWrapper2: $("autohiveWrapper2"),

  structuresBuyAt: $("structuresBuyAt"),

  combineTabButton: $("combineTabButton") as HTMLButtonElement,
  challengesTabButton: $("challengesTabButton") as HTMLButtonElement,
  statsTabButton: $("statsTabButton") as HTMLButtonElement,
  helpTabButton: $("helpTabButton") as HTMLButtonElement,

  combineTabContent: $("combineTabContent"),
  challengesTabContent: $("challengesTabContent"),
  statsTabContent: $("statsTabContent"),
  helpTabContent: $("helpTabContent"),

  sacrificeResets: $("sacrificeResets"),

  autoflowerButton: $("autoflowerButton") as HTMLButtonElement,
  autobeeButton: $("autobeeButton") as HTMLButtonElement,
  autohiveButton: $("autohiveButton") as HTMLButtonElement,

  autoflowerButtonWrapper: $("autoflowerButtonWrapper"),
  autobeeButtonWrapper: $("autobeeButtonWrapper"),
  autohiveButtonWrapper: $("autohiveButtonWrapper"),
};
//todo shorten these names?
