import Image from 'next/image';
import styles from "./Header.module.css"
import Logo from '@/public/images/doitdocker.svg'
import Link from 'next/link'
import { Auth } from 'aws-amplify';
import Button from '../Button/Button';



export default function Header({children}){
    
    function logout() {
        Auth.signOut()
          .then(() => console.log('Usuário desconectado'))
          .catch(err => console.log(err));
      }

    return (
        <div className='flex items-center justify-between px-20 py-1'>
            <div>
                <Link href={"/"}><Image src={Logo} width="280" height="280"></Image></Link>
            </div>
            <div >
                <ul className='flex padding'>
                    <li className='mr-6 font-bold text-blue-400	text-lg'> <button onClick={logout}>Deslogar</button> </li>
                    <li className='mr-6 font-bold text-blue-400	text-lg'><div className={styles.container}><Link href={"/tasks"}>Tasks</Link></div></li>
                </ul>
            </div>
        </div>
    )
}