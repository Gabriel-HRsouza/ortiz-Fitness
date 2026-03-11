package org.ortiz.fitness;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "alunos")
@SequenceGenerator(name = "alunoSeq", sequenceName = "aluno_id_seq", allocationSize = 1, initialValue = 1)
public class Aluno extends PanacheEntity {
    public String nome;
    public String email;
    public String plano;
    public String telefone;
    public String dataNascimento;
    public String senha;
}