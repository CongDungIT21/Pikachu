import { _decorator, Component, Node, AudioSource, InstancedBuffer } from 'cc';
import { ConfigGame } from './ConfigGame';
const { ccclass, property } = _decorator;

// background play when change setting
// mouse sound play when mouse event
@ccclass('AudioHandle')
export class AudioHandle extends Component {
    private allAudio: AudioSource[] = [];
    private soundSetting;
    public static inst: AudioHandle = null;
    onLoad() {
       // this.audioSource = this.getComponent(AudioSource);
       AudioHandle.inst = this;
       this.allAudio = this.getComponents(AudioSource);
    //    this.allAudio.forEach(ad => {
    //     console.log(ad.clip);
    //    })
       this.soundSetting = ConfigGame.getInstance().sound;
    }

    start() {
    }

    update(deltaTime: number) {
        
    }

    updateSetting() {
        this.soundSetting = ConfigGame.getInstance().sound;
        this.playBackgroundMusic();
    }

    playBackgroundMusic() {
        if(this.soundSetting[0]) {
            this.allAudio[0].play();
        }
        else 
        {
            this.allAudio[0].stop();//Trường hợp thay đổi setting khi background đang play
        } 
    }

    stopBackgroundMusic() {
        if(this.soundSetting[0]) this.allAudio[0].stop();
    }

    playClickMouse() {
        if(this.soundSetting[1]) this.allAudio[1].play();
    }

    playDeleteItem() {
        if(this.soundSetting[2]) this.allAudio[2].play();
    }

    // Khi không trùng id
    // Khi không có đường đi
    playReverseItem() {
        //console.log("This play Reverse Item")
        if(this.soundSetting[3]) this.allAudio[3].play();
    }


    //End Game Stop All Sound
    stopSound() {
        this.allAudio.forEach(e => e.stop());
    }
}


