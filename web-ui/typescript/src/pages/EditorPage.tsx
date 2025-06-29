import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { DiagramNode, DiagramLink } from '../types/state';
import { BOOTSTRAP_CLASSES, NODE_TYPES } from '../constants';
import { selectEditor } from '../store';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Interface pour les props de la page Editor avec destructuration atomique
interface EditorPageProps {
  readonly className?: string;
}

// Composant EditorPage avec destructuration atomique et Bootstrap 5.3.7
export const EditorPage: React.FC<EditorPageProps> = ({
  className = ''
}) => {
  const { t } = useTranslation();

  // Sélecteurs Redux avec destructuration atomique
  const { diagram, filename, isModified, isSaving } = useSelector(selectEditor);

  // États locaux avec destructuration atomique
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const [showNodeProperties, setShowNodeProperties] = useState(false);
  const [zoom, setZoom] = useState(100);

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
    ALERT_WARNING,
    ALERT_INFO,
    NAV,
    NAV_TABS,
    NAV_ITEM,
    NAV_LINK,
    TAB_CONTENT,
    TAB_PANE
  } = BOOTSTRAP_CLASSES;

  // Effet pour initialiser l'éditeur avec destructuration atomique
  useEffect(() => {
    // TODO: Initialiser l'éditeur de diagramme
    console.log('Initialisation de l\'éditeur...');
  }, []);

  // Fonctions de gestion avec destructuration atomique
  const handleSave = () => {
    // TODO: Dispatch action pour sauvegarder
    console.log('Sauvegarde du diagramme...');
  };

  const handleSaveAs = () => {
    // TODO: Dispatch action pour sauvegarder sous
    console.log('Sauvegarde sous...');
  };

  const handleExport = () => {
    // TODO: Dispatch action pour exporter
    console.log('Export du diagramme...');
  };

  const handleAddNode = (nodeType: string) => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type: nodeType,
      position: { x: 100, y: 100 },
      data: { label: `Nouveau ${nodeType}` }
    };

    // TODO: Dispatch action pour ajouter le nœud
    console.log('Ajout du nœud:', newNode);
  };

  const handleNodeSelect = (node: DiagramNode) => {
    const { id, type, position, data } = node;
    setSelectedNode({ id, type, position, data });
    setShowNodeProperties(true);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(25, Math.min(200, newZoom)));
  };

  // Rendu de la page avec destructuration atomique
  if (isSaving) {
    return <LoadingSpinner text={t('editor.saving')} />;
  }

  return (
    <div className={`${CONTAINER_FLUID} ${className}`}>
      <div className={ROW}>
        <div className={COL}>
          {/* Header de l'éditeur avec destructuration atomique */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
              <h1 className="h3 mb-0 me-3">{filename || t('editor.untitled')}</h1>
              {isModified && (
                <span className={`${BADGE} ${BADGE_SECONDARY}`}>
                  {t('editor.modified')}
                </span>
              )}
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
            </div>
          </div>

          {/* Barre d'outils avec destructuration atomique */}
          <div className={`${CARD} mb-3`}>
            <div className={CARD_BODY}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  <button className={`${BUTTON} ${BUTTON_PRIMARY}`} onClick={handleSave}>
                    <i className="bi bi-save me-2"></i>
                    {t('editor.actions.save')}
                  </button>
                  <button className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY}`} onClick={handleSaveAs}>
                    <i className="bi bi-save-as me-2"></i>
                    {t('editor.actions.saveAs')}
                  </button>
                  <button className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`} onClick={handleExport}>
                    <i className="bi bi-download me-2"></i>
                    {t('editor.actions.export')}
                  </button>
                </div>
                <div className="d-flex gap-2">
                  <button className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}>
                    <i className="bi bi-undo me-2"></i>
                    {t('editor.actions.undo')}
                  </button>
                  <button className={`${BUTTON} ${BUTTON_OUTLINE_SECONDARY}`}>
                    <i className="bi bi-redo me-2"></i>
                    {t('editor.actions.redo')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={ROW}>
            {/* Panneau latéral avec destructuration atomique */}
            <div className={`${COL} col-md-3`}>
              <div className={`${CARD} mb-3`}>
                <div className={CARD_HEADER}>
                  <h5 className={CARD_TITLE}>{t('editor.palette.title')}</h5>
                </div>
                <div className={CARD_BODY}>
                  <div className="d-grid gap-2">
                    {Object.entries(NODE_TYPES).map(([key, value]) => {
                      const { START, END, DECISION, PROCESS, INPUT, OUTPUT } = NODE_TYPES;

                      let buttonClass: string = BUTTON_OUTLINE_PRIMARY;
                      let icon = 'bi-circle';

                      switch (value) {
                        case START:
                          buttonClass = BUTTON_SUCCESS;
                          icon = 'bi-play-circle';
                          break;
                        case END:
                          buttonClass = BUTTON_DANGER;
                          icon = 'bi-stop-circle';
                          break;
                        case DECISION:
                          buttonClass = BUTTON_WARNING;
                          icon = 'bi-diamond';
                          break;
                        case PROCESS:
                          buttonClass = BUTTON_PRIMARY;
                          icon = 'bi-square';
                          break;
                        case INPUT:
                          buttonClass = BUTTON_INFO;
                          icon = 'bi-arrow-down-circle';
                          break;
                        case OUTPUT:
                          buttonClass = BUTTON_SECONDARY;
                          icon = 'bi-arrow-up-circle';
                          break;
                      }

                      return (
                        <button
                          key={key}
                          className={`${BUTTON} ${buttonClass}`}
                          onClick={() => handleAddNode(value)}
                          title={t(`editor.palette.${value}`)}
                        >
                          <i className={`${icon} me-2`}></i>
                          {t(`editor.palette.${value}`)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Propriétés du nœud sélectionné avec destructuration atomique */}
              {selectedNode && (
                <div className={`${CARD} mb-3`}>
                  <div className={CARD_HEADER}>
                    <h5 className={CARD_TITLE}>{t('editor.properties.title')}</h5>
                  </div>
                  <div className={CARD_BODY}>
                    <div className="mb-3">
                      <label className="form-label">{t('editor.properties.type')}</label>
                      <div className="form-control-plaintext">
                        <span className={`${BADGE} ${BADGE_PRIMARY}`}>
                          {selectedNode.type}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">{t('editor.properties.position')}</label>
                      <div className="form-control-plaintext">
                        X: {selectedNode.position.x}, Y: {selectedNode.position.y}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">{t('editor.properties.label')}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={String(selectedNode.data.label || '')}
                        onChange={(e) => {
                          // TODO: Mettre à jour le label du nœud
                          console.log('Mise à jour du label:', e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Zone de travail avec destructuration atomique */}
            <div className={`${COL} col-md-9`}>
              <div className={`${CARD} h-100`}>
                <div className={CARD_BODY} style={{ height: '600px', position: 'relative' }}>
                  {/* Zone de diagramme avec destructuration atomique */}
                  <div
                    className="diagram-workspace"
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
                    {diagram.nodes.map((node: DiagramNode) => {
                      const { id, type, position, data } = node;

                      let nodeClass = 'node-default';
                      let icon = 'bi-circle';

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
                            border: '2px solid #007bff',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textAlign: 'center',
                            padding: '4px'
                          }}
                          onClick={() => handleNodeSelect(node)}
                          title={String(data.label || '')}
                        >
                          <i className={`${icon} me-1`}></i>
                          {String(data.label || '')}
                        </div>
                      );
                    })}

                    {/* Liens du diagramme avec destructuration atomique */}
                    {diagram.links.map((link: DiagramLink) => {
                      const { id, source, target } = link;

                      // TODO: Calculer les positions des liens
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
                            stroke="#007bff"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
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
                                fill="#007bff"
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
                        <i className="bi bi-diagram-3 display-1"></i>
                        <p className="mt-3">{t('editor.empty.message')}</p>
                        <p className="small">{t('editor.empty.hint')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes avec destructuration atomique */}
      {isModified && (
        <div className={`${ALERT} ${ALERT_WARNING} position-fixed bottom-0 end-0 m-3`} role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {t('editor.modified.warning')}
        </div>
      )}
    </div>
  );
}; 