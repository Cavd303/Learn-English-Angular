import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0


  public tentativas: number = 3

  @Output() public fim: EventEmitter<string> = new EventEmitter<string>()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


  public atualizaResposta(resposta: Event): void {
    this.resposta = (resposta.target as HTMLInputElement).value
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtBr == this.resposta) {

      this.progresso = this.progresso + (100 / this.frases.length)
      //troca pergunta
      this.rodada++

      if(this.rodada === 4) {
        this.fim.emit('Vitória')
      }

      //atualiza frase
      this.atualizaRodada()
      
    } else {
      this.tentativas--
      
      if(this.tentativas === -1) {
        this.fim.emit('Derrota')
      } 
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
