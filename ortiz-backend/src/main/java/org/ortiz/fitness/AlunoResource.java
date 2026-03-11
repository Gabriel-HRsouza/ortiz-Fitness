package org.ortiz.fitness;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/alunos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoResource {

    @POST
    @Transactional
    public Response cadastrar(Aluno aluno) {
        aluno.persist();
        return Response.status(Response.Status.CREATED).entity(aluno).build();
    }

    @GET
    public List<Aluno> listar() {
        return Aluno.listAll();
    }
}