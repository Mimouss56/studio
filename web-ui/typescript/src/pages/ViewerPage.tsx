import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { DiagramNode, DiagramLink } from '../types/state';
import { BOOTSTRAP_CLASSES, NODE_TYPES } from '../constants';
import { selectViewer, selectEditor } from '../store';

// Interface pour les props de la page Viewer avec destructuration atomique
interface ViewerPageProps {
  readonly className?: string;
}

// Composant ViewerPage avec destructuration atomique et Bootstrap 5.3.7
export const ViewerPage: React.FC<ViewerPageProps> = ({
  className = ''
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Sélecteurs Redux avec destructuration atomique
  const { show, packId, diagramId, isFullscreen } = useSelector(selectViewer);
  const { diagram } = useSelector(selectEditor);

  // États locaux avec destructuration atomique
  const [zoom, setZoom] = useState(100);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Destructuration des classes Bootstrap
  const {
    CONTAINER_FLUID,
    ROW,
    COL,
    CARD,
    CARD_HEADER,
    CARD_BODY,
    CARD_TITLE,
    BUTTON,
    BUTTON_PRIMARY,
    BUTTON_SECONDARY,
    BUTTON_OUTLINE_PRIMARY,
    BUTTON_OUTLINE_SECONDARY,
    BUTTON_SUCCESS,
    BUTTON_DANGER,
    BUTTON_WARNING,
    BUTTON_INFO,
    BADGE,
    BADGE_PRIMARY,
    BADGE_SECONDARY,
    BADGE_SUCCESS,
    BADGE_DANGER,
    ALERT,
    ALERT_INFO,
    PROGRESS,
    PROGRESS_BAR
  } = BOOTSTRAP_CLASSES;

  // Effet pour gérer le mode plein écran avec destructuration atomique
  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, [isFullscreen]);

  // Effet pour la lecture automatique avec destructuration atomique
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && diagram.nodes.length > 0) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          return next >= diagram.nodes.length ? 0 : next;
        });
      }, 2000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, diagram.nodes.length]);

  // Fonctions de gestion avec destructuration atomique
  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(25, Math.min(200, newZoom)));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      return next >= diagram.nodes.length ? 0 : next;
    });
  };

  const handleStepBackward = () => {
    setCurrentStep((prev) => {
      const next = prev - 1;
      return next < 0 ? diagram.nodes.length - 1 : next;
    });
  };

  const handleClose = () => {
    navigate('/');
  };

  // Rendu de la page avec destructuration atomique
  if (!show) {
    return null;
  }

  return (
    <div className={`${CONTAINER_FLUID} ${className} viewer-page`}>
      <div className={ROW}>
        <div className={COL}>
          {/* Header du viewer avec destructuration atomique */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <h1 className="h3 mb-0 me-3">
                {t('viewer.title')}
                {packId && (
                  <span className="text-muted ms-2">({packId})</span>
                )}
              </h1>
            </div>
            <div className="d-flex gap-2">
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                onClick={() => handleZoomChange(zoom - 10)}
                disabled={zoom <= 25}
              >
                <i className="bi bi-zoom-out"></i>
              </button>
              <span className="d-flex align-items-center px-2">
                {zoom}%
              </span>
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                onClick={() => handleZoomChange(zoom + 10)}
                disabled={zoom >= 200}
              >
                <i className="bi bi-zoom-in"></i>
              </button>
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY}`}
                onClick={() => handleZoomChange(100)}
              >
                <i className="bi bi-arrows-fullscreen"></i>
              </button>
              <button
                className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                onClick={handleClose}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>

          {/* Contrôles de lecture avec destructuration atomique */}
          <div className={`${CARD} mb-3`}>
            <div className={CARD_BODY}>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <button
                  className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                  onClick={handleStepBackward}
                  disabled={diagram.nodes.length === 0}
                >
                  <i className="bi bi-skip-backward"></i>
                </button>

                <button
                  className={`${BUTTON} ${isPlaying ? BUTTON_WARNING : BUTTON_SUCCESS}`}
                  onClick={handlePlayPause}
                  disabled={diagram.nodes.length === 0}
                >
                  <i className={`bi bi-${isPlaying ? 'pause' : 'play'}`}></i>
                  {isPlaying ? t('viewer.controls.pause') : t('viewer.controls.play')}
                </button>

                <button
                  className={`${BUTTON} ${BUTTON_DANGER}`}
                  onClick={handleStop}
                  disabled={diagram.nodes.length === 0}
                >
                  <i className="bi bi-stop"></i>
                  {t('viewer.controls.stop')}
                </button>

                <button
                  className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}
                  onClick={handleStepForward}
                  disabled={diagram.nodes.length === 0}
                >
                  <i className="bi bi-skip-forward"></i>
                </button>
              </div>

              {/* Barre de progression avec destructuration atomique */}
              {diagram.nodes.length > 0 && (
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-muted">
                      {t('viewer.progress.step')} {currentStep + 1} / {diagram.nodes.length}
                    </span>
                    <span className="small text-muted">
                      {Math.round(((currentStep + 1) / diagram.nodes.length) * 100)}%
                    </span>
                  </div>
                  <div className={PROGRESS}>
                    <div
                      className={PROGRESS_BAR}
                      style={{
                        width: `${((currentStep + 1) / diagram.nodes.length) * 100}%`
                      }}
                      role="progressbar"
                      aria-valuenow={currentStep + 1}
                      aria-valuemin={0}
                      aria-valuemax={diagram.nodes.length}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Zone de visualisation avec destructuration atomique */}
          <div className={`${CARD} h-100`}>
            <div className={CARD_BODY} style={{ height: '600px', position: 'relative' }}>
              {/* Zone de diagramme avec destructuration atomique */}
              <div
                className="diagram-viewer"
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #dee2e6',
                  borderRadius: '0.375rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left'
                }}
              >
                {/* Nœuds du diagramme avec destructuration atomique */}
                {diagram.nodes.map((node: DiagramNode, index: number) => {
                  const { id, type, position, data } = node;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  let nodeClass = 'node-default';
                  let icon = 'bi-circle';
                  let borderColor = '#007bff';
                  let backgroundColor = '#ffffff';

                  // Styles selon l'état avec destructuration atomique
                  if (isActive) {
                    borderColor = '#28a745';
                    backgroundColor = '#d4edda';
                  } else if (isCompleted) {
                    borderColor = '#6c757d';
                    backgroundColor = '#f8f9fa';
                  }

                  switch (type) {
                    case NODE_TYPES.START:
                      nodeClass = 'node-start';
                      icon = 'bi-play-circle';
                      break;
                    case NODE_TYPES.END:
                      nodeClass = 'node-end';
                      icon = 'bi-stop-circle';
                      break;
                    case NODE_TYPES.DECISION:
                      nodeClass = 'node-decision';
                      icon = 'bi-diamond';
                      break;
                    case NODE_TYPES.PROCESS:
                      nodeClass = 'node-process';
                      icon = 'bi-square';
                      break;
                    case NODE_TYPES.INPUT:
                      nodeClass = 'node-input';
                      icon = 'bi-arrow-down-circle';
                      break;
                    case NODE_TYPES.OUTPUT:
                      nodeClass = 'node-output';
                      icon = 'bi-arrow-up-circle';
                      break;
                  }

                  return (
                    <div
                      key={id}
                      className={`diagram-node ${nodeClass}`}
                      style={{
                        position: 'absolute',
                        left: position.x,
                        top: position.y,
                        width: '120px',
                        height: '60px',
                        border: `2px solid ${borderColor}`,
                        borderRadius: '8px',
                        backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        textAlign: 'center',
                        padding: '4px',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive ? '0 0 10px rgba(40, 167, 69, 0.5)' : 'none'
                      }}
                      title={String(data.label || '')}
                    >
                      <i className={`${icon} me-1`}></i>
                      {String(data.label || '')}
                      {isActive && (
                        <span className={`${BADGE} ${BADGE_SUCCESS} position-absolute top-0 start-100 translate-middle`}>
                          <i className="bi bi-play"></i>
                        </span>
                      )}
                    </div>
                  );
                })}

                {/* Liens du diagramme avec destructuration atomique */}
                {diagram.links.map((link: DiagramLink, index: number) => {
                  const { id, source, target } = link;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  const strokeColor = isActive ? '#28a745' : isCompleted ? '#6c757d' : '#007bff';
                  const strokeWidth = isActive ? '3' : '2';

                  return (
                    <svg
                      key={id}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                      }}
                    >
                      <line
                        x1="60"
                        y1="30"
                        x2="180"
                        y2="30"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        markerEnd="url(#arrowhead)"
                        style={{ transition: 'all 0.3s ease' }}
                      />
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill={strokeColor}
                          />
                        </marker>
                      </defs>
                    </svg>
                  );
                })}
              </div>

              {/* Message si aucun nœud avec destructuration atomique */}
              {diagram.nodes.length === 0 && (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center text-muted">
                    <i className="bi bi-eye-slash display-1"></i>
                    <p className="mt-3">{t('viewer.empty.message')}</p>
                    <p className="small">{t('viewer.empty.hint')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations sur l'étape actuelle avec destructuration atomique */}
          {diagram.nodes.length > 0 && currentStep < diagram.nodes.length && (
            <div className={`${ALERT} ${ALERT_INFO} mt-3`} role="alert">
              <div className="d-flex align-items-center">
                <i className="bi bi-info-circle me-2"></i>
                <div>
                  <strong>{t('viewer.current.step')}:</strong> {String(diagram.nodes[currentStep].data.label || '')}
                  <br />
                  <small className="text-muted">
                    {t('viewer.current.type')}: {diagram.nodes[currentStep].type}
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};