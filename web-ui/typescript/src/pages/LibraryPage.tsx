import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { PackInfo, LibraryFilter } from '../types/state';
import { BOOTSTRAP_CLASSES } from '../constants';
import { selectLibrary } from '../store';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Interface pour les props de la page Library avec destructuration atomique
interface LibraryPageProps {
  readonly className?: string;
}

// Composant LibraryPage avec destructuration atomique et Bootstrap 5.3.7
export const LibraryPage: React.FC<LibraryPageProps> = ({
  className = ''
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Sélecteurs Redux avec destructuration atomique
  const { packs, isLoading, error, searchTerm, filter } = useSelector(selectLibrary);

  // États locaux avec destructuration atomique
  const [selectedPack, setSelectedPack] = useState<PackInfo | null>(null);
  const [showPackDetails, setShowPackDetails] = useState(false);

  // Destructuration des classes Bootstrap
  const {
    CONTAINER,
    ROW,
    COL,
    CARD,
    CARD_HEADER,
    CARD_BODY,
    CARD_TITLE,
    CARD_TEXT,
    BUTTON,
    BUTTON_PRIMARY,
    BUTTON_OUTLINE_PRIMARY,
    FORM_CONTROL,
    FORM_LABEL,
    BADGE,
    BADGE_PRIMARY,
    BADGE_SECONDARY,
    ALERT,
    ALERT_DANGER,
    ALERT_INFO
  } = BOOTSTRAP_CLASSES;

  // Effet pour charger la bibliothèque avec destructuration atomique
  useEffect(() => {
    // TODO: Dispatch action pour charger la bibliothèque
    console.log('Chargement de la bibliothèque...');
  }, [dispatch]);

  // Fonctions de gestion avec destructuration atomique
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // TODO: Dispatch action pour mettre à jour la recherche
    console.log('Recherche:', value);
  };

  const handleFilterChange = (newFilter: Partial<LibraryFilter>) => {
    // TODO: Dispatch action pour mettre à jour le filtre
    console.log('Filtre mis à jour:', newFilter);
  };

  const handlePackSelect = (pack: PackInfo) => {
    setSelectedPack(pack);
    setShowPackDetails(true);
  };

  const handlePackOpen = (pack: PackInfo) => {
    const { id, name } = pack;
    // TODO: Navigation vers l'éditeur avec le pack sélectionné
    console.log('Ouverture du pack:', { id, name });
  };

  // Fonction de filtrage avec destructuration atomique
  const filteredPacks = packs.filter((pack: PackInfo) => {
    const { name, description, author, tags } = pack;
    const searchLower = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(searchLower) ||
      description.toLowerCase().includes(searchLower) ||
      author.toLowerCase().includes(searchLower) ||
      tags.some((tag: string) => tag.toLowerCase().includes(searchLower))
    );
  });

  // Rendu de la page avec destructuration atomique
  if (isLoading) {
    return <LoadingSpinner text={t('library.loading')} />;
  }

  if (error) {
    return (
      <div className={`${CONTAINER} ${className}`}>
        <div className={`${ALERT} ${ALERT_DANGER}`} role="alert">
          <h4 className="alert-heading">{t('library.error.title')}</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CONTAINER} ${className}`}>
      <div className={ROW}>
        <div className={COL}>
          {/* Header avec destructuration atomique */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2">{t('library.title')}</h1>
            <div className="d-flex gap-2">
              <button className={`${BUTTON} ${BUTTON_PRIMARY}`}>
                <i className="bi bi-plus-circle me-2"></i>
                {t('library.actions.create')}
              </button>
              <button className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY}`}>
                <i className="bi bi-upload me-2"></i>
                {t('library.actions.import')}
              </button>
            </div>
          </div>

          {/* Filtres avec destructuration atomique */}
          <div className={`${CARD} mb-4`}>
            <div className={CARD_BODY}>
              <div className={ROW}>
                <div className={`${COL} col-md-6`}>
                  <label htmlFor="search" className={FORM_LABEL}>
                    {t('library.search.label')}
                  </label>
                  <input
                    type="text"
                    id="search"
                    className={FORM_CONTROL}
                    placeholder={t('library.search.placeholder')}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className={`${COL} col-md-3`}>
                  <label htmlFor="sortBy" className={FORM_LABEL}>
                    {t('library.sort.label')}
                  </label>
                  <select
                    id="sortBy"
                    className={FORM_CONTROL}
                    value={filter.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                  >
                    <option value="name">{t('library.sort.name')}</option>
                    <option value="date">{t('library.sort.date')}</option>
                    <option value="popularity">{t('library.sort.popularity')}</option>
                  </select>
                </div>
                <div className={`${COL} col-md-3`}>
                  <label htmlFor="sortOrder" className={FORM_LABEL}>
                    {t('library.order.label')}
                  </label>
                  <select
                    id="sortOrder"
                    className={FORM_CONTROL}
                    value={filter.sortOrder}
                    onChange={(e) => handleFilterChange({ sortOrder: e.target.value as any })}
                  >
                    <option value="asc">{t('library.order.ascending')}</option>
                    <option value="desc">{t('library.order.descending')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des packs avec destructuration atomique */}
          {filteredPacks.length === 0 ? (
            <div className={`${ALERT} ${ALERT_INFO}`} role="alert">
              <h4 className="alert-heading">{t('library.empty.title')}</h4>
              <p>{t('library.empty.message')}</p>
            </div>
          ) : (
            <div className={ROW}>
              {filteredPacks.map((pack: PackInfo) => {
                const { id, name, description, version, author, tags, thumbnail, createdAt } = pack;

                return (
                  <div key={id} className={`${COL} col-md-6 col-lg-4 mb-4`}>
                    <div className={`${CARD} h-100`}>
                      {thumbnail && (
                        <img
                          src={thumbnail}
                          className="card-img-top"
                          alt={name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      )}
                      <div className={CARD_BODY}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className={CARD_TITLE}>{name}</h5>
                          <span className={`${BADGE} ${BADGE_PRIMARY}`}>
                            v{version}
                          </span>
                        </div>
                        <p className={CARD_TEXT}>{description}</p>
                        <div className="mb-3">
                          <small className="text-muted">
                            {t('library.pack.by')} {author}
                          </small>
                          <br />
                          <small className="text-muted">
                            {t('library.pack.created')} {new Date(createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="mb-3">
                          {tags.map((tag: string) => (
                            <span
                              key={tag}
                              className={`${BADGE} ${BADGE_SECONDARY} me-1`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className={`${BUTTON} ${BUTTON_PRIMARY} flex-fill`}
                            onClick={() => handlePackOpen(pack)}
                          >
                            <i className="bi bi-play-circle me-2"></i>
                            {t('library.pack.open')}
                          </button>
                          <button
                            className={`${BUTTON} ${BUTTON_OUTLINE_PRIMARY}`}
                            onClick={() => handlePackSelect(pack)}
                            title={t('library.pack.details')}
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails du pack avec destructuration atomique */}
      {showPackDetails && selectedPack && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedPack.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPackDetails(false)}
                />
              </div>
              <div className="modal-body">
                <p>{selectedPack.description}</p>
                {/* TODO: Ajouter plus de détails du pack */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPackDetails(false)}
                >
                  {t('common.close')}
                </button>
                <button
                  type="button"
                  className={`${BUTTON} ${BUTTON_PRIMARY}`}
                  onClick={() => {
                    handlePackOpen(selectedPack);
                    setShowPackDetails(false);
                  }}
                >
                  {t('library.pack.open')}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
}; 