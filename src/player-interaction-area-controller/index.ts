import { PlayerInteractionAreaCollisionController } from "../player-interaction-area-collision-controller";
import { MapInteractableController } from "../map-interactable-controller";
import { Keyboard } from "../keyboard";

export class PlayerInteractionAreaController {
  static trySpeakToAnyone() {
    const interactionArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    MapInteractableController.selectInteractablesOnCurrentMap()
      .getInteractables()
      .forEach((interactable) => interactable.restrictToInteractWith());

    if (!interactionArea) {
      return;
    }

    const interactable =
      PlayerInteractionAreaController.findInteractableBasedOnInteractionAreaId(
        interactionArea.value
      );

    if (!interactable) {
      return;
    }

    interactable.allowToInteractWith();
  }

  static talk() {
    if (!Keyboard.keys["Space"].pressed) {
      return;
    }

    const interactionArea =
      PlayerInteractionAreaCollisionController.findCollisionTile();

    if (!interactionArea) {
      return;
    }

    const interactable =
      PlayerInteractionAreaController.findInteractableBasedOnInteractionAreaId(
        interactionArea.value
      );

    if (!interactable) {
      return;
    }

    interactable.interact();
  }

  private static findInteractableBasedOnInteractionAreaId(
    interactionAreaId: number
  ) {
    return MapInteractableController.selectInteractablesOnCurrentMap()
      .getInteractables()
      .find(
        (interactable) =>
          interactable.getInteractionAreaId() === interactionAreaId
      );
  }
}
