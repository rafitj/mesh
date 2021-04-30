package com.rafitj.mesh.controller.projections;

import java.util.List;

public interface DatabaseEntityProjection extends ResourceEntityProjection {
     String getDbType();
     List<String> getDbResources();
}