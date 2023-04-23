import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import {AiOutlineCloseCircle as Close} from 'react-icons/ai'
import React, {useState, useEffect} from 'react';
import axios from '@/axios/config'
import { Auth } from 'aws-amplify';
import styles from "@/styles/Tasks.module.css"
const getUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('Usuário logado:', user);
      return toString(user.username);
    } catch (error) {
      console.log('Nenhum usuário autenticado encontrado');
    }
  };

  function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function generateTime() {
    const dataAtual = new Date();
    const dataFutura = new Date(dataAtual.setDate(dataAtual.getDate() + 2));
  
    const ano = dataFutura.getFullYear();
    const mes = (dataFutura.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataFutura.getDate().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia}`;
  }
export default function Tasks(){ 

    var date = generateTime();

    const [data, setData] = useState([])

    const [tarefa, setTarefa] = useState({
        titulo: "",
        descricao: "",
        status: "PENDENTE",
        dataExpiracao: date
    })

    useEffect(() => {
        axios.get('/tarefa')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, [tarefa])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTarefa((prevState) => ({
    ...prevState,
    [name]: value,
  }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          // Envia a tarefa para o servidor
          console.log(tarefa)
          const response = await axios.post('/tarefa', tarefa);
          console.log(response.data);
          // Reinicia os campos de tarefa
          setTarefa({ titulo: "", descricao: "" });
        } catch (error) {
          console.error(error);
        }}
        
        async function handleDelete(id) {
          await axios.delete(`/tarefa/${id}`)
          .then(response => {
            setData(data.filter(tarefa => tarefa.id !== id));
          })
          .catch(error => {
            console.log(error);
          });
        }
        
    
    return (
        <>
            <div>
            <Header/>
                <div className='flex flex-col items-center'>
                <h2 className='text-3xl mb-10'>Cadastro de tarefas</h2>
                <div className={styles.container}>
                
                <div className=' flex flex-col items-center justify-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        
                        <Input  value={tarefa.titulo} name="titulo" type="text" placeholder="Digite o título da tarefa" onchange={handleChange} minLength={5} maxLength="140"/>
                        <Input value={tarefa.descricao} name="descricao" type="text" placeholder="Digite a descrição da tarefa" onchange={handleChange} minLength={10} maxLength="255"/>
                        <Button altura={40} title="Nova Tarefa" type="submit"/>
                    </form>
                </div>
                </div>
                </div>
                <div className='flex justify-evenly flex-wrap mt-10 mb-8'>
                    {data.length > 0 && data.map((tarefa) => {
                        return (
                        <div key={tarefa.id} className={styles.container}>
                            <div >
                                <div>
                                    <h2 className='text-lg'>{tarefa.titulo}</h2>
                                    <h3>{tarefa.status}</h3>
                                </div>
                                <div>
                                    <h3>{tarefa.descricao}</h3>
                                </div>
                                <div >
                                    <h4>{formatDate(tarefa.dataExpiracao)}</h4>
                                    <Close cursor="pointer" size={20} color='red' onClick={() => handleDelete(tarefa.id)}>Deletar</Close>

                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}