// ----------------------
// Dice rolling functions
// ----------------------

export async function asyncActionDialog({ title = "", content = "", move = 0, actor } = {}) {
  return await new Promise(async (resolve) => {
    new Dialog(
      {
        title: title,
        content: content,
        buttons: {
          button1: {
            icon: '<i class="fa-solid fa-dice"></i>',
            label: game.i18n.localize("ATDC.actor.actions.label"),
            callback: async (html) => {
              const dice = [];

              if (document.getElementById("baseDie").checked) {
                let hdRoll = await new Roll("1d6").evaluate({ async: true });
                dice.push({
                  dieColor: CONFIG.ATDC.baseDieColor,
                  isStress: false,
                  isRisk: false,
                  rollVal: hdRoll.result,
                });
              }

              if (document.getElementById("expertiseDie").checked) {
                let odRoll = await new Roll("1d6").evaluate({ async: true });
                dice.push({
                  dieColor: CONFIG.ATDC.baseDieColor,
                  isStress: false,
                  isRisk: false,
                  rollVal: odRoll.result,
                });
              }

              if (document.getElementById("stressDie").checked) {
                let idRoll = await new Roll("1d6").evaluate({ async: true });
                dice.push({
                  dieColor: CONFIG.ATDC.riskDieColor,
                  isStress: true,
                  isRisk: false,
                  rollVal: idRoll.result,
                });
              }

              if (document.getElementById("bonusDie") != null) {
                if (document.getElementById("bonusDie").checked) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  dice.push({
                    dieColor: CONFIG.ATDC.bonusDieColor,
                    isStress: false,
                    isRisk: false,
                    rollVal: idRoll.result,
                  });
                }
              }

              // Take them out Die
              const threatDice = [];

              if (document.getElementById("threatHarmDie") != null) {
                if (document.getElementById("threatHarmDie").checked) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("threatSupernaturalDie") != null) {
                if (
                  document.getElementById("threatSupernaturalDie").checked
                ) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("outnumberedDie") != null) {
                if (document.getElementById("outnumberedDie").checked) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("weaponDie") != null) {
                if (document.getElementById("weaponDie").checked) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("SupernaturalPowersDie1") != null) {
                if (
                  document.getElementById("SupernaturalPowersDie1").checked
                ) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("SupernaturalPowersDie2") != null) {
                if (
                  document.getElementById("SupernaturalPowersDie2").checked
                ) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("SupernaturalPowersDie3") != null) {
                if (
                  document.getElementById("SupernaturalPowersDie3").checked
                ) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              if (document.getElementById("SupernaturalPowersDie4") != null) {
                if (
                  document.getElementById("SupernaturalPowersDie4").checked
                ) {
                  let idRoll = await new Roll("1d6").evaluate({
                    async: true,
                  });
                  threatDice.push({
                    dieColor: CONFIG.ATDC.takeThemOutDieColor,
                    isStress: false,
                    isRisk: true,
                    rollVal: idRoll.result,
                  });
                }
              }

              // -----------------

              const maxDie = dice.reduce((a, b) =>
                a.rollVal > b.rollVal ? a : b
              );

              // Determine if the stress die won
              let isStressDie = false;
              dice.every((die) => {
                if (die.rollVal == maxDie.rollVal && die.isStress) {
                  isStressDie = true;
                  return false;
                }
                return true;
              });

              let stressMessage = "";
              if (isStressDie) {
                increaseStressByOne(actor);
                stressMessage = stressMoveMessage();
              }

              // Build Dice list
              let diceOutput = "";
              dice.forEach((die) => {
                diceOutput = diceOutput.concat(
                  getDiceForOutput(die.rollVal, die.dieColor),
                  " "
                );
              });

              // threatDice
              let harmMessage = "";
              if (threatDice.length > 0) {
                const maxThreatDie = threatDice.reduce((a, b) =>
                  a.rollVal > b.rollVal ? a : b
                );

                if (maxThreatDie.rollVal >= maxDie.rollVal) {
                  harmMessage = await harmMoveMessage(actor);
                }

                // Build Threat Dice list
                let threatDiceOutput = "";
                threatDice.forEach((die) => {
                  threatDiceOutput = threatDiceOutput.concat(
                    getDiceForOutput(die.rollVal, die.dieColor),
                    " "
                  );
                });

                if (threatDiceOutput) {
                  diceOutput = `${diceOutput}</br></br><b style="font-size:1.2em">${game.i18n.localize("ATDC.dialog.action.risk.label")}</b></br>${threatDiceOutput}`;
                }
              }

              // Check if intel should increase & if stress button should show
              let showStressOnSix = false;
              if (maxDie.rollVal == "6") {
                if (!maxDie.isStress) {
                  showStressOnSix = true;
                }
                increaseIntelByOne(actor);
              }

              // chat message setup
              const dialogData = {
                moveName: dialogTitle(move),
                diceOutput: diceOutput,
                maxDieMessage: getMaxDieMessage(move, maxDie.rollVal),
                stressMessage: stressMessage,
                harmMessage: harmMessage,
                showStressOnSix: showStressOnSix,
                stressOnSixMessage: getStressOnSixMessage(),
                ownerId: actor.id
              }
              const template = 'systems/againstthedarkconspiracy/templates/msg/action-chat-content.hbs';
              const rendered_html = await renderTemplate(template, dialogData);
          
              ChatMessage.create({
                user:game.user_id,
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                rollMode: game.settings.get("core", "rollMode"),
                content: rendered_html
              });

              // ----
              resolve(null);
            },
          },
        },
        close: () => {
          resolve(null);
        },
      },
      { id: "ID-for-CSS" }
    ).render(true);
  });
}

export async function asyncHarmDialog({ title = "", content = "", move = 0, actor } = {}) {
  return await new Promise(async (resolve) => {
    new Dialog(
      {
        title: title,
        content: content,
        buttons: {
          button1: {
            icon: '<i class="fa-solid fa-dice"></i>',
            label: game.i18n.localize("ATDC.actor.actions.label"),
            callback: async (html) => {
              const dice = [];

              if (document.getElementById("baseDie").checked) {
                let hdRoll = await new Roll("1d6").evaluate({ async: true });
                dice.push({
                  dieColor: CONFIG.ATDC.baseDieColor,
                  isStress: false,
                  rollVal: hdRoll.result,
                });
              }

              if (document.getElementById("stressDie").checked) {
                let idRoll = await new Roll("1d6").evaluate({ async: true });
                dice.push({
                  dieColor: CONFIG.ATDC.riskDieColor,
                  isStress: true,
                  rollVal: idRoll.result,
                });
              }

              // bonuses
              const radios = document.getElementsByName("rollBonus");
              let bonusValue = 0;
              for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                  bonusValue = parseInt(radios[i].value);
                  break;
                }
              }

              // -----------------

              let diceOutput = "";

              const maxDieValue = dice.reduce((a, b) =>
                a.rollVal > b.rollVal ? a : b
              ).rollVal;
              const setOfMaxDice = dice.filter((obj) => {
                return obj.rollVal === maxDieValue;
              });

              // Stress
              let stressMessage = "";
              var stressDieR = setOfMaxDice.find((obj) => {
                return obj.isStress === true;
              });

              let maxDie = null;
              if (stressDieR) {
                increaseStressByOne(actor);
                stressMessage = stressMoveMessage();
                maxDie = stressDieR;
              } else {
                maxDie = setOfMaxDice[0];
              }

              const maxDieModified = parseInt(maxDie.rollVal) + bonusValue;

              dice.forEach((die) => {
                diceOutput = diceOutput.concat(
                  getDiceForOutput(die.rollVal, die.dieColor),
                  " "
                );
              });

              // Check if intel should increase & if stress button should show
              let showStressOnSix = false;
              let harmShowIntel = false;
              if (maxDie.rollVal == "6") {
                if (!maxDie.isStress) {
                  showStressOnSix = true;
                }
                harmShowIntel = true;
                increaseIntelByOne(actor);
              }

              // chat message setup
              const dialogData = {
                moveName: dialogTitle(move),
                diceOutput: diceOutput,
                maxDieMessage: getMaxDieMessage(move, maxDieModified, harmShowIntel),
                stressMessage: stressMessage,
                showStressOnSix: showStressOnSix,
                stressOnSixMessage: getStressOnSixMessage(),
                bonusValue: bonusValue,
                ownerId: actor.id
              }
              const template = 'systems/againstthedarkconspiracy/templates/msg/action-chat-content.hbs';
              const rendered_html = await renderTemplate(template, dialogData);
          
              ChatMessage.create({
                user:game.user_id,
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                rollMode: game.settings.get("core", "rollMode"),
                content: rendered_html
              });

              // ----
              resolve(null);
            },
          },
        },
        close: () => {
          resolve(null);
        },
      },
      { id: "ID-for-CSS" }
    ).render(true);
  });
}

// TODO make translatable
export async function asyncStressRoll(actor) {
  const dice = [];
  let hdRoll = await new Roll("1d6").evaluate({ async: true });
  dice.push({
    dieColor: CONFIG.ATDC.riskDieColor,
    isStress: false,
    rollVal: hdRoll.result,
  });

  let diceOutput = "";

  const maxDieValue = dice.reduce((a, b) => a.rollVal > b.rollVal ? a : b).rollVal;
  const setOfMaxDice = dice.filter((obj) => {
    return obj.rollVal === maxDieValue;
  });

  let maxDie = setOfMaxDice[0];

  const maxDieModified = parseInt(maxDie.rollVal);

  let stressVal = null;
  let stressMessage = "";
  let stressValMessage = "";

  stressVal = actor.system.stress.value;

  if (stressVal != null) {
    if (maxDieModified > stressVal) {
      increaseStressByOne(actor);
      stressMessage = `Your ${getWordRiskWithFormatting()} is increases by one!`;
    } else {
      stressMessage = "All good, this time...";
    }

    stressValMessage = `Your Current Stress is ${getWordRiskWithFormatting()} <b>${stressVal}</b>`;
  }

  dice.forEach((die) => {
    diceOutput = diceOutput.concat(
      getDiceForOutput(die.rollVal, die.dieColor),
      " "
    );
  });

  const dialogData = {
    diceOutput: diceOutput,
    stressMessage: stressMessage,
    stressValMessage: stressValMessage
  }
  const template = 'systems/againstthedarkconspiracy/templates/msg/stress-chat-content.hbs';
  const rendered_html = await renderTemplate(template, dialogData);

  ChatMessage.create({
    user:game.user_id,
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    rollMode: game.settings.get("core", "rollMode"),
    content: rendered_html
  });
}

export async function asyncSeekReliefRoll(move = 0, actor) {
  const roll = await new Roll("1d6").evaluate({ async: true });
  const diceOutput = getDiceForOutput(
    roll.result,
    CONFIG.ATDC.baseDieColor
  );
  const chatContentMessage = seekReliefChatContent(
    move,
    diceOutput,
    roll.result
  );

  const user = game.user.id;
  const speaker = ChatMessage.getSpeaker({ actor: actor });
  const rollMode = game.settings.get("core", "rollMode");

  ChatMessage.create({
    user: user,
    speaker: speaker,
    rollMode: rollMode,
    content: chatContentMessage,
  });

  // Mark anchor
  if (move == 4) {
    markAnchor(actor);
  }
  
  // mark expertise
  if (move >= 1 && move <= 3) {
    if (roll.result >= 1 && roll.result <= 3) {
      switchExpertise(true, actor);
    }
  }

  // Stress reduction
  if (move == 4 && (actor.system.anchor.missing || actor.system.anchor.taken)) {
    // don't reduce stress
  } else {
    // reduce stress
    if (roll.result == "6") {
      reduceStress(2, actor);
    } else {
      reduceStress(1, actor);
    }      
  }
}

export function dialogTitle(moveNumber) {
  switch (moveNumber) {
    case 1:
      return `${game.i18n.localize("ATDC.actor.actions.investigate.label")}`;
    case 2:
      return `${game.i18n.localize("ATDC.actor.actions.cover.label")}`;
    case 3:
      return `${game.i18n.localize("ATDC.actor.actions.flee.label")}`;
    case 5:
      return `${game.i18n.localize("ATDC.actor.actions.chase.label")}`;
    case 6:
      return `${game.i18n.localize("ATDC.actor.actions.takeThemOut.label")}`;
    case 7:
      return `${game.i18n.localize("ATDC.actor.actions.harm.label")}`;
    case 4:
      return `${game.i18n.localize("ATDC.actor.actions.doSomethingElse.label")}`;
    default:
      console.error("Error: case not matched in _dialogTitle");
      return `error`;
  }
}

export function seekReliefDialogTitle(moveNumber) {
    switch (moveNumber) {
      case 1:
        return `${game.i18n.localize("ATDC.actor.seekRelief.behaveBadly.label")}`;
      case 2:
        return `${game.i18n.localize("ATDC.actor.seekRelief.vice.label")}`;
      case 3:
        return `${game.i18n.localize("ATDC.actor.seekRelief.seekGuidance.label")}`;
      case 4:
        return `${game.i18n.localize("ATDC.actor.seekRelief.seekSolaceRelationship.label")}`;
      case 5:
        return `${game.i18n.localize("ATDC.actor.seekRelief.revealHistory.label")}`;
      default:
        console.error("Error: case not matched in _seekReliefDialogTitle");
        return `error`;
    }
}

export function getDiceForOutput(dieNumber, colorHex) {
    switch (dieNumber) {
      case "1":
        return `<i class="fas fa-dice-one" style="color:${colorHex}; font-size: 2em;"></i>`;
      case "2":
        return `<i class="fas fa-dice-two" style="color:${colorHex}; font-size: 2em;"></i>`;
      case "3":
        return `<i class="fas fa-dice-three" style="color:${colorHex}; font-size: 2em;"></i>`;
      case "4":
        return `<i class="fas fa-dice-four" style="color:${colorHex}; font-size: 2em;"></i>`;
      case "5":
        return `<i class="fas fa-dice-five" style="color:${colorHex}; font-size: 2em;"></i>`;
      case "6":
        return `<i class="fas fa-dice-six" style="color:${colorHex}; font-size: 2em;"></i>`;
      default:
        console.error("Error: case not matched in _getDiceForOutput");
        return `error`;
    }
}

// TODO make translatable
export function getStressOnSixMessage() {
    return `<b><i> Roll for ${getWordRiskWithFormatting()}</b></i>.`
}

// TODO make translatable
export function getMaxDieMessage(moveNumber, maxDieNumber, harmShowIntel) {
    switch (moveNumber) {
      case 1: {
        // Investigate
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `you get the minimum amount of information you need to proceed and mark <b><i>${getWordHeatWithFormatting()}</b></i>`;
          case "4":
          case "5":
            return `you get the minimum needed to proceed and <b><i>Control will also answer 1 question</b></i>.`;
          case "6":
            let message = `you get the minimum needed to proceed and <b><i>Control will also answer 2 questions</b></i>. <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
        }
      }
      case 2: // Maintain Your Cover
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `you’re blown! Choose to either <b><i>get caught</b></i> or <b><i>mark ${getWordHeatWithFormatting()}</b></i> and <b><i>flee for your life</b></i>.`;
          case "4":
          case "5":
            return `your cover holds, or they don’t find you.`;
          case "6":
            let message = `you succeed brilliantly: <b><i>agree with Control what extra benefit you get; </b></i>
            <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.2)</span>`;
        }
      case 3: // Flee For Your Life
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `you’re in trouble! Choose to either <b><i>get caught</b></i> or <b><i>agree with Control who or what gets left behind</b></i> and <b><i>mark ${getWordHeatWithFormatting()}</b></i> and <b><i>flee for your life</b></i>, again.`;
          case "4":
          case "5":
            return `you get away clean unless Control chooses to spend ${getWordHeatWithFormatting()} to maintain the pursuit and forces you to <b><i>flee for your life</b></i>, again.`;
          case "6":
            let message = `you succeed brilliantly: <b><i>agree with Control what extra benefit you get; </b></i>
            <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.3)</span>`;
        }
      case 5: // Chase Them Down
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `Dammit, they’re fast! Choose to either <b><i>let them get away</i></b> or <b><i>agree with Control the practical cost of staying in the race</i></b> and <b><i>mark ${getWordHeatWithFormatting()}</i></b> and <b><i>chase them down again</i></b>.`;
          case "4":
          case "5":
            return `you catch them unless Control chooses to spend ${getWordHeatWithFormatting()} to impede you and force you to <b><i>chase them down</i></b>, again.`;
          case "6":
            let message = `you succeed brilliantly: <b><i>agree with Control what extra benefit you get; </b></i>
            <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.5)</span>`;
        }
      case 6: // Take Them Out
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `you <b><i>fail</i></b>, or <b><i>succeed at a cost</i></b>, but always <b><i>mark ${getWordHeatWithFormatting()}</i></b>.`;
          case "4":
          case "5":
            return `you succeed with no obvious complication or benefit`;
          case "6":
            let message = `you succeed brilliantly: <b><i>agree with Control what extra benefit you get; </b></i>
            <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.6)</span>`;
        }
      case 7: // Harm
        switch (maxDieNumber) {
          case 0:
          case 1:
          case 2:
          case 3:
            return `The consequences are serious, say if:
                    <ul>
                        <li>It’s mortal. You<b><i> fill your ${getWordRiskWithFormatting()} track</i></b> and crack.</li>
                        <li>It’s bloody. You’ll <b><i>die after one more action</i></b> without medical treatment.</li>
                        <li>It’s painful. You <b><i>cannot use your Expertise</i></b> until you get medical treatment.</li>
                    </ul>
                    <i>Medical treatment requires an Operator, who could be the one needing treatment, to mark a gear slot and declare a "Medical Kit".</i>`;
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            let message = `You were lucky this time! It hurts, but you’ll live.`;
            if (harmShowIntel) {
              message += `<br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`
            }
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage) hit default</span>`;
        }
      case 4: // Do Something Else
      default:
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `you either fail or <b><i>Control may offer you success at a cost</i></b>, but always <b><i>mark ${getWordHeatWithFormatting()}</i></b>.`;
          case "4":
          case "5":
            return `you succeed with no obvious complication or benefit.`;
          case "6":
            let message = `you succeed brilliantly: <b><i>agree with Control what extra benefit you get; </b></i>
            <br><b><i>${getWordIntelWithFormatting()} has been increased by one.</b></i>`;
            return message;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.4)</span>`;
        }
    }
}

// TODO make translatable
export function seekReliefMaxDieMessage(moveNumber, maxDieNumber) {
    switch (moveNumber) {
      case 1: {
        // Behave Badly
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `Your inadequacy is clear, they pity you. You can’t use your Expertise until ${getWordRiskWithFormatting()} goes up.`;
          case "4":
          case "5":
            return `<b>If they are an Operator</b>, agree with them why and they take it so badly that <b><i>THEY roll for ${getWordRiskWithFormatting()}</i></b>.
            </br>
            <b>If they are an NPC, <i>mark ${getWordHeatWithFormatting()}</i></b> and agree how this draws the Conspiracy’s attention.`;
          case "6":
            return `<b>If they are an Operator</b>, agree with them why and they take it so badly & <b><i>THEY roll for ${getWordRiskWithFormatting()}</i></b>.
            </br>
            <b>If they are an NPC, <i>mark ${getWordHeatWithFormatting()}</i></b> and agree how this draws the Conspiracy’s attention.
            </br></br>It was really worth it: ${getWordRiskWithFormatting()} reduced by 2 instead of 1.`;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
        }
      }
      case 2: // Indulge a Vice
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `You’re ashamed of yourself & distracted. You can’t use your Expertise until ${getWordRiskWithFormatting()} goes up.`;
          case "4":
          case "5":
            return `<b><i>Mark ${getWordHeatWithFormatting()}</i></b> and agree how this draws the Conspiracy’s attention.`;
          case "6":
            return `<b><i>Mark ${getWordHeatWithFormatting()}</i></b> and agree how this draws the Conspiracy’s attention.
            </br></br>It was really worth it: ${getWordRiskWithFormatting()} reduced by 2 instead of 1.`;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.2)</span>`;
        }
      case 3: // Look for Guidance
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `They see through your false contrition. You can’t use your Expertise until ${getWordRiskWithFormatting()} goes up.`;
          case "4":
          case "5":
            return `<b><i>Mark ${getWordHeatWithFormatting()}</i></b> and describe what they ask you to do to restore their belief in you and how this draws the attention of the Conspiracy to the team or makes things difficult for you. You cannot go back to them for support until you fulfil the obligation they have placed on you.`;
          case "6":
            return `<b><i>Mark ${getWordHeatWithFormatting()}</i></b> and describe what they ask you to do to restore their belief in you and how this draws the attention of the Conspiracy to the team or makes things difficult for you. You cannot go back to them for support until you fulfil the obligation they have placed on you.
            </br></br>It was really worth it: ${getWordRiskWithFormatting()} reduced by 2 instead of 1.`;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.3)</span>`;
        }
      case 4: // Seek solace in a relationship
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
            return `<b><i>Your ${getWordAnchorWithFormatting()} has been Marked!</i></b>, placing them on the Conspiracy Target list, or Missing if they are already a Target. <i>Only Control can mark Taken.</i>`;
          case "6":
            return `<b><i>Your ${getWordAnchorWithFormatting()} has been Marked!</i></b>, placing them on the Conspiracy Target list, or Missing if they are already a Target. <i>Only Control can mark Taken.</i>
            </br></br>It was really worth it: ${getWordRiskWithFormatting()} reduced by 2 instead of 1.`;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.4)</span>`;
        }
      case 5: // Reveal some of your history together
        switch (maxDieNumber) {
          case "1":
          case "2":
          case "3":
            return `<b>EITHER</b> say why you feel bad about the event, then you can’t use your Expertise until ${getWordRiskWithFormatting()} goes up;
            </br><b>OR</b> add something about your ${getWordAnchorWithFormatting()} to your recollection or its aftermath and <b><i>mark them</b></i>.`;
          case "4":
          case "5":
            return `The other Operator describes a different version or view of the same event. They: 
            </br><b>EITHER</b> say why they are hurt by it and then they <b><i>roll for ${getWordRiskWithFormatting()}</b></i>;
            </br><b>OR</b> they choose to add something about their ${getWordAnchorWithFormatting()} to their recollection or its aftermath and then <b><i>they mark their ${getWordAnchorWithFormatting()}</b></i>.`;
          case "6":
            return `The other Operator describes a different version or view of the same event. They: 
            </br><b>EITHER</b> say why they are hurt by it and then they <b><i>roll for ${getWordRiskWithFormatting()}</b></i>;
            </br><b>OR</b> they choose to add something about their ${getWordAnchorWithFormatting()} to their recollection or its aftermath and then <b><i>they mark their ${getWordAnchorWithFormatting()}</b></i>.
            </br></br>It was really worth it: ${getWordRiskWithFormatting()} reduced by 2 instead of 1.`;
          default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.5)</span>`;
        }
      default:
        return `<span style="color:#ff0000">ERROR(getMaxDieMessage.default)</span>`;
    }
}

export function seekReliefChatContent(moveNumber, diceOutput, maxDieNumber) {
    const moveName = seekReliefDialogTitle(moveNumber);
    return `
        <p style="font-size: 1.5em"><b>${moveName}</b> ${game.i18n.localize("ATDC.actor.actions.chat.result.label")}</p>
        <p>${diceOutput}</p>
        <p>${seekReliefMaxDieMessage(moveNumber, maxDieNumber)}</p>
    `;
}

// TODO make translatable
export async function harmMoveMessage(actor) {
  const dialogData = {
    takeThemOutDieColor: CONFIG.ATDC.takeThemOutDieColor,
    ownerId: actor.id
  }
  const template = 'systems/againstthedarkconspiracy/templates/msg/harm-chat-roll-msg.hbs';
  return await renderTemplate(template, dialogData);
}

// TODO make translatable
export function stressMoveMessage() {
    return `<hr>
            <div style="font-size: 1em">
                <b>The situation causes you ${getWordRiskWithFormatting()}!</b>
                </br>Your ${getWordRiskWithFormatting()} has increased.
            <div>`;
}

/*
    special word functions
*/

export function getWordIntelWithFormatting() {
    return `<b style="color: ${CONFIG.ATDC.intelColor}">${game.i18n.localize(
        "ATDC.actor.actions.intel.colored"
    )}</b>`;
}

export function getWordRiskWithFormatting() {
    return `<b style="color: ${CONFIG.ATDC.riskDieColor}">${game.i18n.localize(
        "ATDC.actor.actions.risk.colored"
    )}</b>`;
}

export function getWordHeatWithFormatting() {
    return `<b style="color: ${CONFIG.ATDC.heatColor}">${game.i18n.localize(
        "ATDC.actor.actions.heat.colored"
    )}</b>`;
}

export function getWordAnchorWithFormatting() {
    return `<b style="color: ${CONFIG.ATDC.anchorColor}">${game.i18n.localize(
        "ATDC.actor.actions.anchor.colored"
    )}</b>`;
}

// Helper functions

export function switchExpertise(toggle, actor) {
    actor.system.expertise.expertiseUsed = toggle;
    actor.update({ "system.expertise.expertiseUsed": toggle });
}

export function increaseStressByOne(actor) {
    let newStress = duplicate(actor.system.stress.value);

    if (newStress < 6) {
      let currentArray = actor.system.stress.states;
      const firstPos = currentArray.indexOf(false);
      if (firstPos != -1) {
        currentArray[firstPos] = true;
        actor.update({ ["system.stress.states"]: currentArray });
      }
    }

    // update Stress
    ++newStress;
    actor.system.stress.value = newStress;
    actor.update({ "system.stress.value": newStress });
}

export function reduceStress(amount = 1, actor) {
    let newStress = duplicate(actor.system.stress.value);

    if (newStress > 0) {
      let currentArray = actor.system.stress.states;
      for (let i = 0; i < amount; i++) {
        const firstPos = currentArray.lastIndexOf(true);
        if (firstPos != -1) {
          currentArray[firstPos] = false;
          actor.update({ ["system.stress.states"]: currentArray });
        }
      }
    }

    // update Stress
    newStress = newStress - amount;
    actor.system.stress.value = newStress;
    actor.update({ "system.stress.value": newStress });
}

export function increaseIntelByOne(actor) {
    let newIntel = duplicate(actor.system.intel.value);

    if (newIntel < 6) {
      let currentArray = actor.system.intel.states;
      const isFalse = (element) => element === false;
      const firstPos = currentArray.findIndex(isFalse);
      currentArray[firstPos] = true;
      return actor.update({ ["system.intel.states"]: currentArray });
    }

    // update Intel
    ++newIntel;
    actor.system.intel.value = newIntel;
    actor.update({ "system.intel.value": newIntel });
}

export function markAnchor(actor) {
    let target = actor.system.anchor.target;
    let missing = actor.system.anchor.missing;
    let taken = actor.system.anchor.taken;
    if (!target) {
      target = true;
      actor.update({ "system.anchor.target": target });
    } else if (!missing) {
      missing = true;
      actor.update({ "system.anchor.missing": missing });
    } else if (!taken) {
      taken = true;
      actor.update({ "system.anchor.taken": taken });
    }
}

export async function dialogContent(moveNumber, actor) {
    const dialogData = {
      riskDieColor: CONFIG.ATDC.riskDieColor,
      bonusDieColor: CONFIG.ATDC.bonusDieColor,
      takeThemOutDieColor: CONFIG.ATDC.takeThemOutDieColor,
      expertiseUsed: actor.system.expertise.expertiseUsed
    }
    switch (moveNumber) {
      case 1: // Investigate
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/investigate.hbs', dialogData);
      case 2: // Maintain Your Cover
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/maintain-cover.hbs', dialogData);
      case 3: // Flee For Your Life
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/flee.hbs', dialogData);
      case 5: // Chase Them Down
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/chase.hbs', dialogData);
      case 6: // Take Them Out
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/take-them-out.hbs', dialogData);
      case 7: // harm
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/harm.hbs', dialogData);
      case 4: // Do Something Else
      default:
        return await renderTemplate('systems/againstthedarkconspiracy/templates/dialog/do-something-else.hbs', dialogData);
    }
}