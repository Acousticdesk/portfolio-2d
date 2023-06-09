import dialogCloudImageBase64 from "../assets/images/dialog-cloud.png";
import { Canvas } from "../../canvas";
import { INTERACTABLE_DECORATOR_ENUMS } from "./enums";
import { InteractableSubject } from "../interfaces";
import { Movable } from "../../movables-controller/interfaces";
import { Initable } from "../../initable/interfaces";
import { Animatable } from "../../animatable/interfaces";
import { Drawable } from "../../drawable/interfaces";

export class InteractableDecorator
  implements
    Movable,
    Initable<void, Promise<InteractableDecorator>>,
    Animatable,
    Drawable
{
  private readonly subject: InteractableSubject<
    { src: string; numberOfFrames: number; framesOfInterest: number[] },
    Promise<void>
  >;
  private interactionIcon!: HTMLImageElement;
  private interactionIconX = 0;
  private interactionIconY = 0;
  private interactionIconAnimationStep = 0;
  private lastInteractionIconAnimationFrameChange = Date.now();
  private canInteract = false;
  // this property is used to find the closest Interactable when user collides with an interaction area
  private readonly interactionAreaId: number = 0;
  private readonly interaction: (self: InteractableDecorator) => void;
  constructor(
    subject: InteractableSubject<
      { src: string; numberOfFrames: number; framesOfInterest: number[] },
      Promise<void>
    >,
    interactionAreaId: number,
    interaction: (self: InteractableDecorator) => void
  ) {
    this.subject = subject;
    this.interactionIconX = this.subject.getX();
    this.interactionIconY =
      this.subject.getY() +
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_OFFSET_Y;
    this.interactionAreaId = interactionAreaId;
    this.interaction = interaction;
  }
  async init() {
    this.interactionIcon = new Image();
    this.interactionIcon.src = dialogCloudImageBase64;
    await new Promise((resolve, reject) => {
      this.interactionIcon.onload = resolve;
      this.interactionIcon.onerror = reject;
    });

    return this;
  }

  updateAnimationSpriteFrame() {
    const idleAnimationShouldThrottle =
      Date.now() - this.lastInteractionIconAnimationFrameChange <= 50;

    if (idleAnimationShouldThrottle) {
      return;
    }

    this.interactionIconAnimationStep += 1;

    if (
      this.interactionIconAnimationStep >
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_IDLE_ANIMATION_STEPS
    ) {
      this.interactionIconAnimationStep = 0;
    }

    this.lastInteractionIconAnimationFrameChange = Date.now();

    return this.subject.updateAnimationSpriteFrame();
  }

  draw() {
    if (!this.canInteract) {
      return this.subject.draw();
    }
    Canvas.getCtx().drawImage(
      this.interactionIcon,
      0,
      0,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      this.interactionIconX,
      this.interactionIconY + this.interactionIconAnimationStep,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE
    );
    return this.subject.draw();
  }
  getX() {
    return this.subject.getX();
  }
  setX(x: number) {
    this.interactionIconX = x;
    return this.subject.setX(x);
  }
  getY() {
    return this.subject.getY();
  }
  setY(y: number) {
    this.interactionIconY =
      y + INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_OFFSET_Y;
    return this.subject.setY(y);
  }

  allowToInteractWith() {
    this.canInteract = true;
  }

  restrictToInteractWith() {
    this.canInteract = false;
  }

  getInteractionAreaId() {
    return this.interactionAreaId;
  }

  getSubject() {
    return this.subject;
  }

  interact() {
    this.interaction(this);
  }
}
