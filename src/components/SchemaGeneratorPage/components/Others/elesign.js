import { props } from "../../index"
import { Image } from "antd";
import elesignImg from '../public/elesign.png'
export default function(){
    const src = elesignImg//图片地址
    return <Image width={200} height={200} src={src} alt={"签章"} {...props}>
        
    </Image>
}