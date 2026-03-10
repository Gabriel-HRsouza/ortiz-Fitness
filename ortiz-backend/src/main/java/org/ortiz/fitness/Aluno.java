package org.ortiz.fitness;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Aluno extends PanacheEntity {
    public String nome;
    public String email;
    public String plano;
    public String telefone;
    public String dataNascimento;
    public String senha;
}