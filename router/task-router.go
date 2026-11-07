package router

import (
	"github.com/QuantumNous/new-api/controller"
	"github.com/QuantumNous/new-api/middleware"
	"github.com/gin-gonic/gin"
)

// SetTaskRouter registers the generic task-plugin API surface.
//
// Gin requires every route sharing a path position to use the same wildcard
// name, so the first segment is uniformly ":key"; it carries the plugin key
// on submit routes and the task id on read routes.
func SetTaskRouter(router *gin.Engine) {
	// Public branded media surface: the same decoder and billing as Studio,
	// authenticated by an API key rather than a dashboard session.
	media := router.Group("/v1/media/tasks")
	media.Use(middleware.RouteTag("relay"), middleware.TokenAuth(), middleware.SystemPerformanceCheck())
	media.POST("", controller.PinStudioTaskRoute, middleware.PrepareTaskPluginRoute(), middleware.ModelRequestRateLimit(), middleware.Distribute(), controller.RelayTask)
	media.GET("/:key", controller.GetPlaygroundTaskResult)
	media.GET("/:key/artifacts", controller.GetTaskArtifacts)

	taskSubmitRouter := router.Group("/v1/tasks")
	taskSubmitRouter.Use(middleware.RouteTag("relay"), middleware.TokenAuth())
	{
		taskSubmitRouter.POST("/:key", middleware.PrepareTaskPluginSubmit(), middleware.Distribute(), controller.RelayTask)
	}

	taskReadRouter := router.Group("/v1/tasks")
	taskReadRouter.Use(middleware.RouteTag("relay"), middleware.TokenAuth())
	{
		taskReadRouter.GET("/:key", controller.GetTask)
		taskReadRouter.GET("/:key/artifacts", controller.GetTaskArtifacts)
	}

	taskContentRouter := router.Group("/v1/tasks")
	taskContentRouter.Use(
		middleware.RouteTag("relay"),
		middleware.TokenOrTaskArtifactAccessAuth("key", "artifact_key"),
	)
	{
		taskContentRouter.GET("/:key/artifacts/:artifact_key/content", controller.TaskArtifactContent)
		taskContentRouter.HEAD("/:key/artifacts/:artifact_key/content", controller.TaskArtifactContent)
	}
}
