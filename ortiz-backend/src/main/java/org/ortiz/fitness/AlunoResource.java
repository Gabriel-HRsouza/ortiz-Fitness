package org.ortiz.fitness;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
//import io.quarkus.security.Authenticated; // Se usar segurança, mas por enquanto:


@Path("/alunos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoResource {

    @GET
    public List<Aluno> listarTodos() {
        return Aluno.listAll();
    }

    @POST
    @Transactional
    public Aluno matricular(Aluno aluno) {
        aluno.persist();
        return aluno;
    }
}